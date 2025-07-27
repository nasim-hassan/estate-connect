'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string; // will hold area name (e.g., "Gulshan")
  image_url: string;
  type: string;
  size: number;
}

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          id,
          title,
          price,
          bedrooms,
          bathrooms,
          size,
          area_id,
          property_images(image_url),
          areas:area_id(name)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching properties:', error.message);
        return;
      }

      const propertyWithImages = (data || []).map((property: any) => {
        const image_url = property.property_images?.[0]?.image_url
          ? `http://127.0.0.1:54321/storage/v1/object/public/${property.property_images[0].image_url}`
          : 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image';

        return {
          id: property.id,
          title: property.title,
          price: property.price,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          area: property.areas?.name || 'Unknown Area',
          location: property.areas?.name || '',
          type: 'Residential', // static for now (you can join property_type_id later)
          size: property.size || 0,
          image_url,
        };
      });

      setProperties(propertyWithImages);
    };

    fetchProperties();
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `৳${(price / 10000000).toFixed(2)} Crore`;
    return `৳${(price / 100000).toFixed(2)} Lakh`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search properties in Bangladesh..."
              className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={property.image_url}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                  {property.area}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {formatPrice(property.price)}
                </p>
                <p className="text-gray-600 mt-1">{property.area}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span>{property.bedrooms} beds</span>
                  <span>{property.bathrooms} baths</span>
                  <span>{property.size} sqft</span>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
