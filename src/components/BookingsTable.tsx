import { Trash } from "lucide-react";
import { Booking } from "../types/types";

interface BookingsTableProps {
  bookings: Booking[];
  onDelete: (id: string) => void;
}

export function BookingsTable({ bookings, onDelete }: BookingsTableProps) {
  return (
    <div className="rounded-md border">
      <table className="table-auto w-full">
        <thead className="">
          <tr className="">
            <th className="flex-1 p-2 text-left">Client Name</th>
            <th className="flex-1 p-2 text-left hidden lg:table-cell">Email</th>
            <th className="flex-1 p-2 text-left hidden lg:table-cell">
              Design Description
            </th>
            <th className="flex-1 p-2 text-left">Date Created</th>
            <th className="flex-1 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="">
              <td className="flex-1 p-2">{booking.full_name}</td>
              <td className="flex-1 p-2 hidden lg:table-cell">
                {booking.email}
              </td>
              <td className="flex-1 p-2 hidden lg:table-cell">
                {booking.description}
              </td>
              <td className="flex-1 p-2">
                {new Date(booking.createdAt).toLocaleDateString()}
              </td>
              <td className="flex-1 p-2">
                <button onClick={() => onDelete(booking.id)}>
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
