// src/app/admin/layout.tsx
import Topbar from '@/components/admin/Topbar'
import Sidebar from '@/components/admin/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Topbar full width on top */}
      <Topbar />

      {/* Sidebar + Main content side by side, below topbar */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
