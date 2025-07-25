'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-lg' : 'bg-white'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className={`text-2xl font-bold ${
                isScrolled ? 'text-white' : 'text-blue-600'
              }`}>
                EstateConnect
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? isScrolled 
                      ? 'border-white text-white'
                      : 'border-blue-500 text-gray-900'
                    : isScrolled
                      ? 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/properties')
                    ? isScrolled 
                      ? 'border-white text-white'
                      : 'border-blue-500 text-gray-900'
                    : isScrolled
                      ? 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Properties
              </Link>
              <Link
                href="/about"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/about')
                    ? isScrolled 
                      ? 'border-white text-white'
                      : 'border-blue-500 text-gray-900'
                    : isScrolled
                      ? 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/contact')
                    ? isScrolled 
                      ? 'border-white text-white'
                      : 'border-blue-500 text-gray-900'
                    : isScrolled
                      ? 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link
              href="/login"
              className={`${
                isScrolled 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-500 hover:text-gray-700'
              } px-3 py-2 rounded-md text-sm font-medium`}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={`ml-4 ${
                isScrolled
                  ? 'bg-white text-black hover:bg-gray-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } px-4 py-2 rounded-md text-sm font-medium transition-colors`}
            >
              Register
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
              } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500`}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`sm:hidden ${isScrolled ? 'bg-black' : 'bg-white'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/')
                  ? isScrolled
                    ? 'bg-gray-900 border-white text-white'
                    : 'bg-blue-50 border-blue-500 text-blue-700'
                  : isScrolled
                    ? 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/properties')
                  ? isScrolled
                    ? 'bg-gray-900 border-white text-white'
                    : 'bg-blue-50 border-blue-500 text-blue-700'
                  : isScrolled
                    ? 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/about')
                  ? isScrolled
                    ? 'bg-gray-900 border-white text-white'
                    : 'bg-blue-50 border-blue-500 text-blue-700'
                  : isScrolled
                    ? 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                isActive('/contact')
                  ? isScrolled
                    ? 'bg-gray-900 border-white text-white'
                    : 'bg-blue-50 border-blue-500 text-blue-700'
                  : isScrolled
                    ? 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Contact
            </Link>
          </div>
          <div className={`pt-4 pb-3 border-t ${isScrolled ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="space-y-1">
              <Link
                href="/login"
                className={`block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium ${
                  isScrolled
                    ? 'text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
                    : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium ${
                  isScrolled
                    ? 'text-gray-300 hover:bg-gray-700 hover:border-gray-300 hover:text-white'
                    : 'text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 