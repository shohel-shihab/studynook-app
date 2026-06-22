"use client";
import { motion } from "framer-motion";
import {
  FaWifi,
  FaUsers,
  FaBuilding,
  
} from "react-icons/fa";
import BookingCard from "./BookingCard";

export default function RoomDetails({ room }) {
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
         <BookingCard room={room}></BookingCard>
        </div>
      </div>
    </div>
  );
}