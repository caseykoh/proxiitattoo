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
      <table>
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Email</th>
            <th>Design Description</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.full_name}</td>
              <td>{booking.email}</td>
              <td>{booking.description}</td>
              <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
