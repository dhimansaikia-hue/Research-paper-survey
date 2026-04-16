create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'Field Team',
  created_at timestamptz default now()
);

create table if not exists locations (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  latitude double precision not null,
  longitude double precision not null,
  created_at timestamptz default now()
);

create table if not exists parcels (
  id uuid primary key default uuid_generate_v4(),
  parcel_name text not null,
  location_name text not null,
  village_survey_no text,
  visit_date date,
  status text,
  number_of_owners int,
  owner_names text[],
  land_area_guntha numeric,
  price_per_guntha numeric,
  price_per_sqft numeric,
  total_ask_price_cr numeric,
  access_to_land text,
  land_type text,
  dp_zone text,
  distance_station_km numeric,
  distance_highway_km numeric,
  water_availability text,
  survey_plan_available boolean default false,
  extract_712_available boolean default false,
  contour_plan_available boolean default false,
  broker_name text,
  broker_contact text,
  has_nearby_projects boolean default false,
  nearby_project_name text,
  nearby_project_type text,
  nearby_project_cost_cr numeric,
  nearby_project_observations text,
  field_observations text,
  photo_paths text[] default '{}',
  photo_count int default 0,
  created_at timestamptz default now()
);

alter table locations enable row level security;
alter table parcels enable row level security;
alter table profiles enable row level security;

create policy "authenticated read locations" on locations for select to authenticated using (true);
create policy "authenticated write locations" on locations for all to authenticated using (true) with check (true);
create policy "authenticated read parcels" on parcels for select to authenticated using (true);
create policy "authenticated write parcels" on parcels for all to authenticated using (true) with check (true);
create policy "authenticated read profiles" on profiles for select to authenticated using (true);
create policy "authenticated write profiles" on profiles for all to authenticated using (true) with check (true);
