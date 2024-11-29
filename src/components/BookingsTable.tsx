import { Archive } from "lucide-react";
interface Booking {
  id: string;
  full_name: string;
  email: string;
  description: string;
  // preferredDate: string;
  // status: "pending";
  createdAt: string;
}

interface BookingsTableProps {
  bookings: Booking[];
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  return (
    <div className="rounded-md border">
      <table className="flex flex-col w-full">
        <thead className="flex flex-col w-full">
          <tr className="flex w-full">
            <th className="flex-1 p-2 text-left">Client Name</th>
            <th className="flex-1 p-2 text-left">Email</th>
            <th className="flex-1 p-2 text-left">Design Description</th>
            <th className="flex-1 p-2 text-left">Date Created</th>
            <th className="flex-1 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="flex w-full">
              <td className="flex-1 p-2">{booking.full_name}</td>
              <td className="flex-1 p-2">{booking.email}</td>
              <td className="flex-1 p-2">{booking.description}</td>
              <td className="flex-1 p-2">
                {new Date(booking.createdAt).toLocaleDateString()}
              </td>
              <td className="flex-1 p-2">
                <button>
                  <Archive className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
