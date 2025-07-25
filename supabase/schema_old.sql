-- Poperties Details
CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,                         -- Property listing title
  price numeric NOT NULL,                      -- Price of the property
  city_id integer REFERENCES public.cities(id) ON DELETE SET NULL,  -- Broad city name (e.g., Dhaka)
  area_id integer REFERENCES public.areas(id) ON DELETE SET NULL,  -- linked area if chosen
  size text,                                   -- Apartment size (e.g., '1268 sq ft')
  bedrooms integer,                            -- Number of bedrooms
  bathrooms integer,                           -- Number of bathrooms
  floor_number integer,                        -- Floor the unit is on
  property_category text 
    CHECK (property_category IN ('Residential', 'Commercial')) NOT NULL,  -- Broad category
  property_type_id integer REFERENCES public.property_types(id) ON DELETE SET NULL, -- Specific type (e.g., Apartment, Office)
  project_id integer REFERENCES public.projects(id) ON DELETE SET NULL, -- Real estate project name or developer
  status text 
    CHECK (status IN ('Ongoing', 'Upcoming', 'Completed')) NOT NULL,      -- Project status
  listed_by uuid 
    REFERENCES profiles(id) 
    ON DELETE SET NULL,                        -- User/agent who listed the property
  is_live boolean DEFAULT true,                -- Property active or inactive
  created_at timestamp with time zone 
    DEFAULT now()                              -- When the listing was created
);

-- Property Images
CREATE TABLE public.property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  uploaded_at timestamp with time zone DEFAULT now()
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
  city_id integer REFERENCES public.cities(id) ON DELETE CASCADE
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
  status text 
    CHECK (status IN ('Ongoing', 'Upcoming', 'Completed')) NOT NULL,
  type text 
    CHECK (type IN ('Residential', 'Commercial')) NOT NULL,
  area_id integer REFERENCES public.areas(id) ON DELETE SET NULL  -- or CASCADE, depending on your use case 
);

-- Clients request meetings for properties
create table public.meeting_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references properties(id) on delete cascade,
  client_id uuid references profiles(id) on delete set null,
  requested_at timestamp with time zone default now(),
  scheduled_for timestamp with time zone not null,
  status text check (status in ('pending', 'confirmed', 'rejected')) default 'pending'
);

-- Site Visit Request
CREATE TABLE public.site_visit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  client_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  requested_at timestamp with time zone DEFAULT now(),
  scheduled_for timestamp with time zone NOT NULL,
  status text CHECK (status IN ('pending', 'confirmed', 'rejected')) DEFAULT 'pending'
);

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

-- Broke page redirects
create table url_redirects (
  id uuid primary key default uuid_generate_v4(),
  old_path text not null,
  new_path text not null,
  created_at timestamp default now()
);


-- adding indexes on foreign keys for faster joins
CREATE INDEX idx_properties_city_id ON public.properties(city_id);
CREATE INDEX idx_properties_area_id ON public.properties(area_id);
CREATE INDEX idx_properties_property_type_id ON public.properties(property_type_id);
CREATE INDEX idx_properties_project_id ON public.properties(project_id);
CREATE INDEX idx_properties_listed_by ON public.properties(listed_by);
