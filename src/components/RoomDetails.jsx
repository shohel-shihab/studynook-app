"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import {
  FaWifi,
  FaUsers,
  FaBuilding,
  FaCalendarCheck,
} from "react-icons/fa";

import BookingCard from "./BookingCard";

export default function RoomDetails({ room }) {
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isOwner = user?.id === room?.ownerId;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Room?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, Delete It",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:5000/rooms/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        router.push("/rooms");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2">
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={room.image}
              alt={room.roomName}
              className="w-full h-[500px] object-cover rounded-3xl"
            />

            <div className="bg-white p-8 rounded-3xl mt-8 shadow">
              <h1 className="text-4xl font-bold">
                {room.roomName}
              </h1>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mt-5">
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl">
                  <FaBuilding />
                  {room.floor}
                </div>

                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-xl">
                  <FaUsers />
                  Capacity: {room.capacity}
                </div>

                <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-xl">
                  <FaCalendarCheck />
                  Bookings: {room.bookingCount || 0}
                </div>
              </div>

              {/* Owner Controls */}
              {isOwner && (
                <div className="flex gap-4 mt-8">
                  <Link
                    href={`/rooms/edit/${room._id}`}
                    className="px-5 py-3 bg-indigo-600 text-white rounded-xl"
                  >
                    Edit Room
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(room._id)
                    }
                    className="px-5 py-3 bg-red-600 text-white rounded-xl"
                  >
                    Delete Room
                  </button>
                </div>
              )}

              {/* Description */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-3">
                  About Room
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">
                  Amenities
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {room.amenities?.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50"
                    >
                      <FaWifi className="text-indigo-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <BookingCard
              room={room}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  );
}