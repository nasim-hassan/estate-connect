// src/components/admin/dashboard/UpcomingSchedule.tsx

export default function UpcomingSchedule() {
    const items = [
      { type: 'Meeting', date: 'June 28, 2025', time: '10:00 AM', with: 'Mr. Hossain' },
      { type: 'Site Visit', date: 'June 29, 2025', time: '2:00 PM', with: 'Mrs. Khan' },
    ];
  
    return (
      <div className="bg-white shadow-md rounded-md p-4 border mt-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-500">Upcoming Schedules</h2>
        <ul className="space-y-3 text-sm text-gray-400">
          {items.map((item, idx) => (
            <li key={idx} className="flex justify-between border-b pb-2">
              <span>
                📌 {item.type} with <strong>{item.with}</strong>
              </span>
              <span className="text-gray-500">{item.date} @ {item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  