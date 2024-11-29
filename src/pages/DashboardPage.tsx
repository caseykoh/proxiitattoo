import { useEffect, useState } from "react";
import { BookingsTable } from "../components/BookingsTable";
import { Calendar, ImageIcon, Users } from "lucide-react";
import axios from "axios";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_APP_API_ENDPOINT + "/appointments"
        );
        console.log(response.data.appointments);
        setBookings(response.data.appointments);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back to your tattoo studio admin portal.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Bookings</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </div>
        </div>
        <div>
          <h2 className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Pending Requests</h3>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </h2>
          <div>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              4 requiring immediate attention
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Flash Designs</div>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              3 uploaded this week
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <div>
          <div className="flex flex-row items-center justify-between">
            <div>Recent Booking Requests</div>
            <a href="/dashboard/bookings">
              <button>View All</button>
            </a>
          </div>
          <div>
            <BookingsTable bookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}
