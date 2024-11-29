"use client";

import { BookingInquiry } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { updateBookingStatus } from "@/app/actions";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface BookingsTableProps {
  bookings: BookingInquiry[];
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleStatusUpdate(
    bookingId: string,
    status: "accepted" | "rejected"
  ) {
    setLoading(bookingId);
    await updateBookingStatus(bookingId, status);
    setLoading(null);
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Design Description</TableHead>
            <TableHead>Preferred Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.clientName}</TableCell>
              <TableCell>{booking.email}</TableCell>
              <TableCell>{booking.designDescription}</TableCell>
              <TableCell>
                {new Date(booking.preferredDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    booking.status === "accepted"
                      ? "success"
                      : booking.status === "rejected"
                      ? "destructive"
                      : "default"
                  }
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleStatusUpdate(booking.id, "accepted")}
                    disabled={
                      booking.status !== "pending" || loading === booking.id
                    }
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => handleStatusUpdate(booking.id, "rejected")}
                    disabled={
                      booking.status !== "pending" || loading === booking.id
                    }
                  >
                    <X className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
