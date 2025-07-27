// src/components/admin/dashboard/SiteVisitOverview.tsx

export default function SiteVisitOverview() {
    return (
      <div className="bg-white shadow-md rounded-md p-4 border">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">Site Visit Requests Overview</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>🔹 Pending: 2</li>
          <li>✅ Confirmed: 3</li>
          <li>❌ Rejected: 2</li>
        </ul>
      </div>
    );
  }
  