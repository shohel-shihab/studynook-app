"use client"
import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ room }) {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
            <div className="relative h-56 w-full">
                <Image
                    src={room.image}
                    alt={room.roomName}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold mb-2">
                    {room.roomName}
                </h3>

                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {room.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">
                        Capacity: {room.capacity}
                    </span>

                    <span className="text-blue-600 font-bold">
                        ${room.hourlyRate}/hr
                    </span>
                </div>

                <Link
                    href={`/rooms/${room._id}`}
                    className="w-full block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}