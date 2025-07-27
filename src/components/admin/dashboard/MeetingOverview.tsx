// src/components/admin/dashboard/MeetingOverview.tsx

export default function MeetingOverview() {
    return (
      <div className="bg-white shadow-md rounded-md p-4 border">
        <h2 className="text-lg font-semibold mb-4 text-gray-600">Meeting Requests Overview</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>🔹 Pending: 4</li>
          <li>✅ Confirmed: 5</li>
          <li>❌ Rejected: 3</li>
        </ul>
      </div>
    );
  }
  