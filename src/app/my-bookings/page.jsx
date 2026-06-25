"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import MyBookingCard from "@/components/MyBookingCard";

export default function MyBookingsPage() {
  const { data: session } =
    authClient.useSession();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${session.user.id}`
        );

        const data = await res.json();

        console.log(
          "Bookings Response:",
          data
        );

        if (Array.isArray(data)) {
          setBookings(data);
        } else if (
          data.bookings &&
          Array.isArray(data.bookings)
        ) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error(error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            You have no bookings yet.
          </h2>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <MyBookingCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      )}
    </section>
  );
}