import Link from "next/link";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <Palette className="h-6 w-6" />
        <span>Tattoo Admin</span>
      </Link>
      <Link
        href="/dashboard/bookings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Bookings
      </Link>
      <Link
        href="/dashboard/flash"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Flash Designs
      </Link>
    </nav>
  );
}
