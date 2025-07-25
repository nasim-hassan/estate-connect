'use client';

import { useState, useMemo, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fullcalendar/common/main.css';
import './calendar-overrides.css';

// Sample bookings data with 'type' field
const initialBookings = [
  {
    id: 1,
    property: 'Luxury Apartment in Banani',
    status: 'Approved',
    type: 'Meeting',
    date: '2025-06-15',
  },
  {
    id: 2,
    property: 'Luxury Apartment in Banani',
    status: 'Cancelled',
    type: 'Meeting',
    date: '2025-06-11',
  },
  {
    id: 3,
    property: 'Luxury Apartment in Banani',
    status: 'Approved',
    type: 'Site Visit',
    date: '2025-06-25',
  },
  {
    id: 4,
    property: 'Plot in Bashundhara',
    status: 'Pending',
    type: 'Site Visit',
    date: '2025-06-27',
  },
  {
    id: 5,
    property: 'Villa in Gulshan',
    status: 'Cancelled',
    type: 'Site Visit',
    date: '2025-06-20',
  },
];


export default function ClientDashboard() {
  const [bookings, setBookings] = useState(initialBookings);
  const [typeFilter, setTypeFilter] = useState<'All' | 'Meeting' | 'Site Visit'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Cancelled'>('All');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      if (typeFilter !== 'All' && booking.type !== typeFilter) return false;
      if (statusFilter !== 'All' && booking.status !== statusFilter) return false;
      if (dateRange.start && booking.date < dateRange.start) return false;
      if (dateRange.end && booking.date > dateRange.end) return false;
      return true;
    });
  }, [bookings, typeFilter, statusFilter, dateRange]);

  const total = filteredBookings.length;
  const approved = filteredBookings.filter((b) => b.status === 'Approved').length;
  const pending = filteredBookings.filter((b) => b.status === 'Pending').length;
  const cancelled = filteredBookings.filter((b) => b.status === 'Cancelled').length;

  const calendarEvents = filteredBookings.map((b) => ({
    id: b.id.toString(),
    title: `${b.type}: ${b.property}`, // removed name here
    start: b.date,
    color:
      b.status === 'Approved'
        ? '#28a745'
        : b.status === 'Pending'
        ? '#ffc107'
        : '#dc3545',
    borderColor:
      b.status === 'Approved'
        ? '#1e7e34'
        : b.status === 'Pending'
        ? '#e0a800'
        : '#bd2130',
    textColor: 'white',
  }));
  

  const handleEventDrop = (info) => {
    const updatedDate = info.event.startStr;
    const eventId = info.event.id;

    setBookings((prev) =>
      prev.map((b) =>
        b.id.toString() === eventId ? { ...b, date: updatedDate } : b
      )
    );

    toast.success(`Updated "${info.event.title}" to ${updatedDate}`);
  };

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    filteredBookings.forEach((b) => {
      if (b.date === today && b.status === 'Approved') {
        toast.info(`Reminder: You have a ${b.type.toLowerCase()} with ${b.name} today`);
      }
    });
  }, [filteredBookings]);

  return (
    <div className="min-h-screen pl-6 pr-6 bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000} />

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex flex-col text-sm text-gray-600">
          Type
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="p-2 border rounded text-gray-400"
          >
            {['All', 'Meeting', 'Site Visit'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm text-gray-600">
          Status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="p-2 border rounded text-gray-400"
          >
            {['All', 'Approved', 'Pending', 'Cancelled'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col text-sm text-gray-600">
          From
          <input
            type="date"
            className="p-2 border rounded text-gray-400"
            onChange={(e) => setDateRange((p) => ({ ...p, start: e.target.value }))}
          />
        </label>

        <label className="flex flex-col text-sm text-gray-600">
          To
          <input
            type="date"
            className="p-2 border rounded text-gray-400"
            onChange={(e) => setDateRange((p) => ({ ...p, end: e.target.value }))}
          />
        </label>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          ['Total Bookings', total, 'text-blue-600'],
          ['Approved Visits', approved, 'text-green-500'],
          ['Pending Requests', pending, 'text-yellow-500'],
          ['Cancelled Bookings', cancelled, 'text-red-500'],
        ].map(([label, count, textColor]) => (
          <div key={label} className="bg-white p-4 rounded shadow text-center">
            <h2 className="font-semibold text-gray-700">{label}</h2>
            <p className={`text-2xl font-bold ${textColor}`}>{count}</p>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Booking Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable
          editable={true}
          events={calendarEvents}
          eventDrop={handleEventDrop}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          dayHeaderClassNames={() => 'bg-blue-100 text-blue-800 font-semibold'}
          eventDisplay="block"
        />
      </div>
    </div>
  );
}
