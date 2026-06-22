"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import BookingModal from "./BookingModal";


const BookingCard = ({ room }) => {
  const [openBooking, setOpenBooking] = useState(false);

  const { data: session } = authClient.useSession();

  return (
    <>
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

        <button
          onClick={() => setOpenBooking(true)}
          className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-semibold transition"
        >
          Book Now
        </button>
      </div>

      <BookingModal
        isOpen={openBooking}
        onClose={() => setOpenBooking(false)}
        room={room}
        session={session}
      />
    </>
  );
};

export default BookingCard;