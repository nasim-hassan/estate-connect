-- Enable pgcrypto (needed for gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ENUM Types
CREATE TYPE project_status AS ENUM ('Ongoing', 'Upcoming', 'Completed');
CREATE TYPE property_category AS ENUM ('Residential', 'Commercial');
CREATE TYPE request_status AS ENUM ('pending', 'confirmed', 'rejected', 'cancelled', 'completed');
CREATE TYPE project_type AS ENUM ('Residential', 'Commercial');

-- Profiles (Linked to Supabase Auth Users)
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cities
CREATE TABLE public.cities (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

-- Areas
CREATE TABLE public.areas (
  id serial PRIMARY KEY,
  name text NOT NULL,
  city_id integer REFERENCES public.cities(id) ON DELETE CASCADE,
  UNIQUE (name, city_id)
);

-- Property Types
CREATE TABLE public.property_types (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

-- Projects
CREATE TABLE public.projects (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL,
  longitude numeric(9,6),
  latitude numeric(9,6),
  status project_status NOT NULL,
  type project_type NOT NULL,
  area_id integer REFERENCES public.areas(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 1. Create a sequence to auto-increment short_id starting from 100001
CREATE SEQUENCE IF NOT EXISTS public.short_id_seq
  START WITH 100001
  INCREMENT BY 1
  OWNED BY public.properties.short_id;

-- 2. Updated properties table
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  short_id integer UNIQUE DEFAULT nextval('public.short_id_seq'),
  title text NOT NULL,
  price numeric NOT NULL,
  city_id integer REFERENCES public.cities(id) ON DELETE SET NULL,
  area_id integer REFERENCES public.areas(id) ON DELETE SET NULL,
  size numeric,
  size_unit text CHECK (size_unit IN ('sq ft', 'sq m')) DEFAULT 'sq ft',
  bedrooms integer,
  bathrooms integer,
  floor_number integer,
  property_category property_category NOT NULL,
  property_type_id integer REFERENCES public.property_types(id) ON DELETE SET NULL,
  project_id integer REFERENCES public.projects(id) ON DELETE SET NULL,
  status project_status NOT NULL,
  listed_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_live boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);


-- Property Images
CREATE TABLE public.property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);
CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);

-- Meeting Requests
CREATE TABLE public.meeting_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  client_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  requested_at timestamptz DEFAULT now() NOT NULL,
  scheduled_for timestamptz NOT NULL,
  status request_status DEFAULT 'pending',
  confirmed_at timestamptz DEFAULT NULL
);
CREATE INDEX idx_meeting_requests_confirmed_at ON public.meeting_requests(confirmed_at);

-- Site Visit Requests
CREATE TABLE public.site_visit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  client_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  requested_at timestamptz DEFAULT now() NOT NULL,
  scheduled_for timestamptz NOT NULL,
  status request_status DEFAULT 'pending',
  confirmed_at timestamptz DEFAULT NULL
);
CREATE INDEX idx_site_visit_requests_confirmed_at ON public.site_visit_requests(confirmed_at);

-- Clients
CREATE TABLE public.clients (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone_number text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Admins
CREATE TABLE public.admins (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- URL Redirects
CREATE TABLE public.url_redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  old_path text NOT NULL UNIQUE,
  new_path text NOT NULL,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_url_redirects_old_path ON public.url_redirects(old_path);

-- Wishlist
CREATE TABLE public.wishlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  UNIQUE (user_id, property_id)
);
CREATE INDEX idx_wishlist_user_id ON public.wishlist(user_id);
CREATE INDEX idx_wishlist_property_id ON public.wishlist(property_id);

-- Inquiries
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  message text NOT NULL,
  property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
  submitted_at timestamptz DEFAULT now(),
  status request_status DEFAULT 'pending'
);
CREATE INDEX idx_inquiries_user_id ON public.inquiries(user_id);
CREATE INDEX idx_inquiries_property_id ON public.inquiries(property_id);

-- Indexes on Properties
CREATE INDEX idx_properties_city_id ON public.properties(city_id);
CREATE INDEX idx_properties_area_id ON public.properties(area_id);
CREATE INDEX idx_properties_property_type_id ON public.properties(property_type_id);
CREATE INDEX idx_properties_project_id ON public.properties(project_id);
CREATE INDEX idx_properties_listed_by ON public.properties(listed_by);
