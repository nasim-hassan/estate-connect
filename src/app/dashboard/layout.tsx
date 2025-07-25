import { ReactNode } from 'react';
import Link from 'next/link';
import '@/app/globals.css'; // ensures global styles are loaded

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
