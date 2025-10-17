create schema if not exists "gis";
create extension if not exists "postgis" with schema "gis" version '3.3.7';
grant usage on schema gis to authenticated;


alter table "public"."tasks" add column "location" gis.geography(Point,4326) not null;

CREATE INDEX tasks_geo_index ON public.tasks USING gist (location);


