"use client";

import Image from "next/image";
import CancelBookingButton from "./CancelBookingButton";

export default function MyBookingCard({
  booking,
}) {
  const isFutureBooking =
    new Date(booking.date) >=
    new Date(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  return (
    <div className="border rounded-2xl p-5 flex flex-col md:flex-row gap-5">
      <Image
        src={booking.roomImage}
        alt={booking.roomName}
        width={180}
        height={120}
        className="rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="text-xl font-bold">
          {booking.roomName}
        </h3>

        <div className="mt-3 space-y-1 text-sm">
          <p>
            Date: {booking.date}
          </p>

          <p>
            Time:
            {" "}
            {booking.startTime}
            {" - "}
            {booking.endTime}
          </p>

          <p>
            Cost: $
            {booking.totalCost}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span
            className={`px-3 py-1 rounded-full text-white text-sm ${
              booking.status ===
              "confirmed"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {booking.status}
          </span>

          {booking.status ===
            "confirmed" &&
            isFutureBooking && (
              <CancelBookingButton
                bookingId={
                  booking._id
                }
              />
            )}
        </div>
      </div>
    </div>
  );
}