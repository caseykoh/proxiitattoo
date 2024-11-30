import { NavLink } from "react-router-dom";
import { Palette } from "lucide-react";

export function AdminNav({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <NavLink
        to="/admin"
        className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <Palette className="h-6 w-6" />
        <span>Tattoo Admin</span>
      </NavLink>
      <NavLink
        to="/admin/bookings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Bookings
      </NavLink>
      <NavLink
        to="/admin/flash"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Flash Designs
      </NavLink>
    </nav>
  );
}
