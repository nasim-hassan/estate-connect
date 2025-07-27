'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Topbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Fake placeholder user info — replace with Supabase logic later
  useEffect(() => {
    setUser({
      name: 'Admin Nasim',
      email: 'nasim@example.com',
    });
  }, []);

  const handleLogout = () => {
    // TODO: Replace with real Supabase logout
    console.log('Logging out...');
    router.push('/admin/login');
  };

  return (
    <header className="h-16 w-full flex items-center justify-between px-6 bg-white border-b shadow-sm">
      <div className="text-2xl font-semibold text-gray-500">Admin Dashboard</div>

      <div className="flex items-center gap-4">
        {user && (
          <div className="text-right">
            <div className="font-medium text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        )}
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
          {user?.name?.[0] ?? 'A'}
        </div>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline ml-2"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
