"use client";
import { motion } from "framer-motion";
import {
  FaWifi,
  FaUsers,
  FaBuilding,

} from "react-icons/fa";
import BookingCard from "./BookingCard";
import ManageRoomCard from "./ManageRoomCard";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RoomDetails({ room }) {
  const router=useRouter();
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Room?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6366f1",
      confirmButtonText: "Yes, Delete It",
      cancelButtonText: "Cancel",
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
        await Swal.fire({
          title: "Deleted!",
          text: "Room deleted successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        router.push("/rooms");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to delete room.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}
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

              <div className="flex gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <FaBuilding />
                  {room.floor}
                </div>

                <div className="flex items-center gap-2">
                  <FaUsers />
                  Capacity: {room.capacity}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-3">
                  About Room
                </h2>

                <p className="text-gray-600">
                  {room.description}
                </p>
              </div>

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

          {/* Right */}
          <div className="flex flex-col gap-2">
            <div className="mb-b"> <ManageRoomCard room={room} handleDelete={handleDelete}></ManageRoomCard></div>
            <BookingCard room={room}></BookingCard>
          </div>
        </div>
      </div>
    </div>
  );
}