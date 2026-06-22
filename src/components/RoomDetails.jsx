"use client";
import { motion } from "framer-motion";
import {
  FaWifi,
  FaUsers,
  FaBuilding,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";

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
          <div>
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-4xl font-bold text-indigo-600">
                ${room.hourlyRate}
              </h3>

              <p className="text-gray-500">
                per hour
              </p>

              <div className="border-y py-5 my-6 space-y-4">
                <div className="flex justify-between">
                  <span>Floor</span>
                  <span>{room.floor}</span>
                </div>

                <div className="flex justify-between">
                  <span>Capacity</span>
                  <span>{room.capacity}</span>
                </div>
              </div>

              <h4 className="font-bold mb-4">
                Includes
              </h4>

              <div className="space-y-3">
                {room.amenities?.slice(0, 4).map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2"
                  >
                    <FaCheckCircle className="text-green-500" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t pt-6">
                <h4 className="font-bold mb-4">
                  Listed By
                </h4>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FaUser />
                  </div>

                  <div>
                    <p className="font-semibold">
                      {room.ownerName || "Admin"}
                    </p>

                    <p className="text-sm text-gray-500">
                      Room Owner
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}