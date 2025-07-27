// src/components/admin/Sidebar.tsx

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-40 h-screen bg-white shadow-md px-4 py-6">
      <nav className="space-y-4">
        <Link href="/admin/dashboard" className="block text-gray-700 hover:text-blue-500">
          Dashboard
        </Link>
        <Link href="/admin/master-data/cities" className="block text-gray-700 hover:text-blue-500">
          Master Data
        </Link>
        <Link href="/admin/properties" className="block text-gray-700 hover:text-blue-500">
          Properties
        </Link>
        <Link href="/admin/requests/meeting-requests" className="block text-gray-700 hover:text-blue-500">
          Requests
        </Link>
        <Link href="/admin/calendar" className="block text-gray-700 hover:text-blue-500">
          Calendar
        </Link>
      </nav>
    </aside>
  );
}
