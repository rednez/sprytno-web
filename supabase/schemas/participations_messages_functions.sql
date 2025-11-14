create or replace function create_participation_message(
    p_participation_id bigint,
    p_message text
)
returns bigint
    language plpgsql
    security invoker
    set search_path = public, extensions
    as $$
    declare
        v_allowed_sender boolean;
        v_my_uid uuid;
        v_recipient_from_task_owner uuid;
        v_recipient_from_participant uuid;
        v_recipient_id uuid;
        v_new_id bigint;
    begin
        select auth.uid() into v_my_uid;

        -- determine recipient id
        select p.user_id, t.user_id
            from public.participations p
            join public.tasks t on t.id = p.task_id
            where p.id = p_participation_id
            into v_recipient_from_participant, v_recipient_from_task_owner;

        if v_recipient_from_participant <> v_my_uid then
            v_recipient_id := v_recipient_from_participant;
        else
            v_recipient_id := v_recipient_from_task_owner;
        end if;

        insert into public.participations_messages(message, recipient_id, participation_id)
        values (
            public.encrypt_participation_message(p_participation_id, p_message), 
            v_recipient_id, 
            p_participation_id)
        returning id into v_new_id;

        return v_new_id;
    end;
$$;

create or replace function encrypt_participation_message(p_participation_id bigint, p_message text)
returns bytea
    language plpgsql
    security definer
    set search_path = public, extensions
    as $$
    declare
        v_secret text;
        v_encrypted_text bytea;
    begin
        select decrypted_secret
        into v_secret
        from vault.decrypted_secrets
        where name = 'participation:' || p_participation_id::text;

        if v_secret is null then
            raise exception 'Secret for participation not found'
                using errcode = 'P0001';
        end if;

        -- decrypt the provided message using the participation-specific secret
        v_encrypted_text := pgp_sym_encrypt(p_message, v_secret, 'compress-algo=1, cipher-algo=aes256');
        return v_encrypted_text;
    end;
$$;

create or replace function get_participation_messages (p_participation_id bigint) returns table (
  id bigint,
  message text,
  created_at participations_messages.created_at % type,
  sender_nickname text,
  sender_avatar_url text,
  recipient_nickname text,
  recipient_avatar_url text,
  sent_by_me boolean
) language plpgsql security invoker
set
  search_path = public as $$
begin
    return query
        select
            pm.id,
            public.decrypt_participation_message(p_participation_id, pm.message) as message,
            pm.created_at,
            upd_sender.nickname as sender_nickname,
            upd_sender.avatar_url as sender_avatar_url,
            upd_recipient.nickname as recipient_nickname,
            upd_recipient.avatar_url as recipient_avatar_url,
            (pm.sender_id = (select auth.uid())) as sent_by_me
        from participations_messages pm
        join users_public_details upd_sender on upd_sender.user_id = pm.sender_id
        join users_public_details upd_recipient on upd_recipient.user_id = pm.recipient_id
        where pm.participation_id = p_participation_id
        order by created_at asc;
end;
$$;

create or replace function decrypt_participation_message(p_participation_id bigint, p_bytes bytea)
returns text
    language plpgsql
    security definer
    set search_path = public, extensions
    as $$
    declare
        v_allowed_sender boolean;
        v_secret text;
        v_decrypted_text text;
    begin
        -- check if sender is either the participant or the task owner
        select exists (
            select 1
            from public.participations p
            join public.tasks t on t.id = p.task_id
            where p.id = p_participation_id
                and ((p.user_id = (select auth.uid())) or (t.user_id = (select auth.uid())))
        ) into v_allowed_sender;

        if not v_allowed_sender then
            raise exception 'Not allowed for this participation'
                using errcode = '42501';
        end if;

        -- retrieve the participation-specific secret
        select decrypted_secret
        into v_secret
        from vault.decrypted_secrets
        where name = 'participation:' || p_participation_id::text;

        if v_secret is null then
            raise exception 'Secret for participation not found'
                using errcode = 'P0001';
        end if;

        -- decrypt the provided message using the participation-specific secret
        v_decrypted_text := pgp_sym_decrypt(p_bytes, v_secret);
        return v_decrypted_text;
    end;
$$;
