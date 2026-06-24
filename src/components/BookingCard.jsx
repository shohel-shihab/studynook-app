"use client";

import { useRouter } from "next/navigation";

export default function BookingCard({
  room,
  user,
}) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-3xl shadow p-6 sticky top-24">
      <h2 className="text-3xl font-bold text-indigo-600">
        ${room.hourlyRate}
      </h2>

      <p className="text-gray-500 mb-6">
        per hour
      </p>

      {user ? (
        <button
          className="w-full py-3 rounded-xl bg-indigo-600 text-white"
        >
          Book Now
        </button>
      ) : (
        <button
          onClick={() =>
            router.push("/login")
          }
          className="w-full py-3 rounded-xl bg-red-600 text-white"
        >
          Login To Book
        </button>
      )}
    </div>
  );
}