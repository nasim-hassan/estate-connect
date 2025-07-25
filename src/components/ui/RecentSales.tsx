'use client';

import Link from 'next/link';

const recentSales = [
  {
    id: 1,
    title: 'Luxury Apartment in Gulshan',
    price: '৳2.8 Crore',
    location: 'Gulshan, Dhaka',
    type: 'Apartment',
    soldDate: 'March 15, 2024',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 2,
    title: 'Villa in Banani',
    price: '৳4.5 Crore',
    location: 'Banani, Dhaka',
    type: 'Villa',
    soldDate: 'March 10, 2024',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  },
  {
    id: 3,
    title: 'Commercial Space in Motijheel',
    price: '৳6.2 Crore',
    location: 'Motijheel, Dhaka',
    type: 'Commercial',
    soldDate: 'March 5, 2024',
    image: 'https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
  },
];

const RecentSales = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Recent Sales
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Explore our recently sold properties in Bangladesh
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {recentSales.map((sale) => (
            <div key={sale.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  className="w-full h-full object-cover"
                  src={sale.image}
                  alt={sale.title}
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sold
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{sale.title}</h3>
                <p className="mt-2 text-gray-500">{sale.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">{sale.price}</span>
                  <span className="text-sm text-gray-500">{sale.type}</span>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Sold on: {sale.soldDate}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/sales/${sale.id}`}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
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
            href="/sales"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            View All Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecentSales; 