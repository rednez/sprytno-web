insert into auth.users 
  (id, email, aud, role, raw_user_meta_data, created_at) 
values 
  (uuid_generate_v4(), 'user1@mail.com', 'authenticated', 'authenticated', '{"email_verified": true}', now()),
  (uuid_generate_v4(), 'user2@mail.com', 'authenticated', 'authenticated', '{"email_verified": true}', now()),
  (uuid_generate_v4(), 'user3@mail.com', 'authenticated', 'authenticated', '{"email_verified": true}', now());


insert into tasks 
  (user_id, type, title, description, repeated_days, location) 
values 
  ((select id from auth.users where email = 'user1@mail.com'), 
    'offer', 
    'Task 1', 
    'Description for Task 1', 
    '{"mon", "wed"}', 
    gis.st_point(13.81585427398764, 50.63616250792455)
  ),
  ((select id from auth.users where email = 'user1@mail.com'), 
    'offer', 
    'Task in Kyiv', 
    'Description for Task in Kyiv. Some very nice place to visit! It is my home.', 
    '{"mon", "wed"}', 
    gis.st_point(30.474982804368395, 50.44926640060052)
  ),
  ((select id from auth.users where email = 'user2@mail.com'), 
    'request', 
    'Task 2', 
    'Description for Task 2', 
    '{"tue", "thu"}',
    gis.st_point(13.825641038471995, 50.6374080107297)
  ),
  ((select id from auth.users where email = 'user3@mail.com'), 
    'offer', 
    'Task 3', 
    'Description for Task 3', 
    '{"fri"}',
    gis.st_point(13.771680747502426, 50.551336965923156)
  );

insert into friends 
  (user_id, friend_id) 
values 
  (
    (select id from auth.users where email = 'user1@mail.com'), 
    (select id from auth.users where email = 'user2@mail.com')
  ),
  (
    (select id from auth.users where email = 'user1@mail.com'), 
    (select id from auth.users where email = 'user3@mail.com')
  );

insert into users_public_details
  (user_id, nickname, avatar_url) 
values 
  (
    (select id from auth.users where email = 'user1@mail.com'), 
    'user1-kiki',
    'https://i.pravatar.cc/400?img=49'
  ),
  (
    (select id from auth.users where email = 'user2@mail.com'), 
    'user2-boba',
    'https://i.pravatar.cc/400?img=69'
  ),
  (
    (select id from auth.users where email = 'user3@mail.com'), 
    'user3-lala',
    null
  );

insert into users_private_details
  (user_id, email, phone) 
values 
  (
    (select id from auth.users where email = 'user1@mail.com'), 
    'user1-secret@mail.com',
    '+380671111111'
  ),
  (
    (select id from auth.users where email = 'user2@mail.com'), 
    'user2-secret@mail.com',
    '+380672222222'
  ),
  (
    (select id from auth.users where email = 'user3@mail.com'), 
    'user3-secret@mail.com',
    '+380673333333'
  );
  
