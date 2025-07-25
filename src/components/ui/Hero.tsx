'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const COUNT_DURATION = 1200;

const useCountUp = (target: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const startTime = performance.now();

    const updateCounter = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      const currentCount = Math.floor(progress * target);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [target]);

  return count;
};

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const propertiesCount = useCountUp(4200);
  const clientsCount = useCountUp(1200);
  const citiesCount = useCountUp(14);
  const experienceCount = useCountUp(8);

  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Bangladesh City Skyline"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find Your Dream Home in Bangladesh
          </h1>
          <p className="mt-6 text-xl text-gray-300">
            Discover the perfect property across major cities in Bangladesh. Browse through thousands of listings and find your ideal home.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="sr-only">Search properties</label>
                <input
                  id="search"
                  name="search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  placeholder="Enter location (e.g., Gulshan, Banani, Dhanmondi)"
                />
              </div>
              <div>
                <a
                  href="tel:+8801234567890"
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatBox label="Properties" value={propertiesCount} />
            <StatBox label="Happy Clients" value={clientsCount} />
            <StatBox label="Cities" value={citiesCount} />
            <StatBox label="Years Experience" value={experienceCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-white">{value}+</div>
    <div className="text-gray-300">{label}</div>
  </div>
);

export default Hero;
