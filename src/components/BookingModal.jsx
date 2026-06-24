"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import DeleteRoomButton from "./DeleteRoomButton";

export default function BookingModal({ room }) {
  const { data: session } = authClient.useSession();

  const user = session?.user;
  const isOwner = user?.email === room.ownerEmail;

  return (
    <div className="mt-6 space-y-4">
      {/* Book Button */}
      {!user ? (
        <Link
          href="/login"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg"
        >
          Login to Book
        </Link>
      ) : (
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
          Book Now
        </button>
      )}

      {/* Owner Controls */}
      {isOwner && (
        <div className="flex gap-4">
          <Link
            href={`/rooms/edit/${room._id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Edit Room
          </Link>

          <DeleteRoomButton roomId={room._id} />
        </div>
      )}
    </div>
  );
}