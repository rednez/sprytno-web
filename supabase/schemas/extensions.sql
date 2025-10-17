-- POSTGIS Extension
create schema if not exists "gis";
create extension postgis with schema "gis";
grant usage on schema gis to authenticated;