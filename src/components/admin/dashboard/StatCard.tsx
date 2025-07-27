// src/components/admin/dashboard/StatCard.tsx

type StatCardProps = {
    title: string;
    value: number | string;
  };
  
  export default function StatCard({ title, value }: StatCardProps) {
    return (
      <div className="bg-white shadow-md rounded-md p-4 border">
        <h2 className="text-sm text-gray-500">{title}</h2>
        <p className="text-2xl font-bold mt-2">{value}</p>
      </div>
    );
  }
  