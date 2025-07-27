'use client';

import { useState, useMemo } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '@/lib/config';

const wrapperStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 23.804201,
  lng: 90.4118424,
};

const mockLocations = [
  {
    id: 1,
    lat: 23.8706429,
    lng: 90.3961717,
    location: 'Uttara',
    status: 'Ongoing',
    type: 'Residential',
  },
  {
    id: 2,
    lat: 23.7880411,
    lng: 90.4029022,
    location: 'Banani',
    status: 'Upcoming',
    type: 'Commercial',
  },
  {
    id: 3,
    lat: 23.7487914,
    lng: 90.3749573,
    location: 'Dhanmondi',
    status: 'Completed',
    type: 'Residential',
  },
  {
    id: 4,
    lat: 23.8647346,
    lng: 90.39541,
    location: 'Uttara',
    status: 'Ongoing',
    type: 'Commercial',
  },
  {
    id: 5,
    lat: 23.7935341,
    lng: 90.4047265,
    location: 'Banani',
    status: 'Upcoming',
    type: 'Residential',
  },
  {
    id: 6,
    lat: 23.8714971,
    lng: 90.3881266,
    location: 'Uttara',
    status: 'Ongoing',
    type: 'Residential',
  }
];

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1e293b' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#64748b' }] },
  { featureType: 'water', stylers: [{ color: '#778da9' }] },
];

const GoogleMapSection = () => {
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredLocations = useMemo(() => {
    return mockLocations.filter((item) => {
      const matchLocation = locationFilter ? item.location === locationFilter : true;
      const matchStatus = statusFilter ? item.status === statusFilter : true;
      const matchType = typeFilter ? item.type === typeFilter : true;
      return matchLocation && matchStatus && matchType;
    });
  }, [locationFilter, statusFilter, typeFilter]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Explore Properties on Map
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            View locations of listed properties across Dhaka
          </p>
        </div>

        <div className="relative w-full h-[600px] rounded-lg shadow-lg overflow-hidden">
          {/* Filters: horizontal row, no common background */}
          <div className="absolute bottom-8 left-8 z-10 flex space-x-2">
            <select
              className="bg-white backdrop-blur border border-gray-300 rounded px-2 py-1 text-sm shadow text-black"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Location</option>
              <option value="Uttara">Uttara</option>
              <option value="Banani">Banani</option>
              <option value="Dhanmondi">Dhanmondi</option>
            </select>

            <select
              className="bg-white backdrop-blur border border-gray-300 rounded px-2 py-1 text-sm shadow text-black"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              className="bg-white backdrop-blur border border-gray-300 rounded px-2 py-1 text-sm shadow text-black"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Type</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
            </select>
          </div>

          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={wrapperStyle}
              center={center}
              zoom={12}
              options={{
                styles: darkMapStyle,
                disableDefaultUI: false,
              }}
            >
              <MarkerClusterer>
                {(clusterer) => (
                  <>
                    {filteredLocations.map((loc) => (
                      <Marker
                        key={loc.id}
                        position={{ lat: loc.lat, lng: loc.lng }}
                        clusterer={clusterer}
                      />
                    ))}
                  </>
                )}
              </MarkerClusterer>
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;
