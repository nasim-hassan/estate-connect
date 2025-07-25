'use client';

import Link from 'next/link';

const properties = [
  {
    id: 1,
    title: 'Luxury Apartment in Gulshan',
    price: '৳2.5 Crore',
    location: 'Gulshan, Dhaka',
    bedrooms: 3,
    bathrooms: 3,
    area: '2,200 sqft',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'Modern Villa in Banani',
    price: '৳4.8 Crore',
    location: 'Banani, Dhaka',
    bedrooms: 4,
    bathrooms: 4,
    area: '3,500 sqft',
    image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
  {
    id: 3,
    title: 'Family Home in Dhanmondi',
    price: '৳3.2 Crore',
    location: 'Dhanmondi, Dhaka',
    bedrooms: 3,
    bathrooms: 2,
    area: '2,800 sqft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
];

const FeaturedProperties = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Properties in Bangladesh
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore our handpicked selection of premium properties across major cities
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  className="w-full h-full object-cover"
                  src={property.image}
                  alt={property.title}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {property.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                <p className="mt-2 text-gray-500">{property.location}</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm text-gray-500">
                  <div>
                    <span className="font-medium">{property.bedrooms}</span> beds
                  </div>
                  <div>
                    <span className="font-medium">{property.bathrooms}</span> baths
                  </div>
                  <div>
                    <span className="font-medium">{property.area}</span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/properties/${property.id}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties; 