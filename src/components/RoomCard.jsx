"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    FaUsers,
    FaBuilding,
    FaArrowRight,
} from "react-icons/fa";

export default function RoomCard({ room }) {
    const amenities = room.amenities || [];

    const visibleAmenities = amenities.slice(0, 3);
    const remainingAmenities =
        amenities.length - 3;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
            }}
            whileHover={{
                y: -10,
            }}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        >
            {/* Image */} <div className="relative h-60 overflow-hidden"> <Image
                src={room.image}
                alt={room.roomName}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
            />


                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow text-sm font-semibold text-blue-600">
                    ${room.hourlyRate}/hr
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">
                    {room.roomName}
                </h3>

                <p className="mt-3 text-gray-500 text-sm leading-relaxed line-clamp-3">
                    {room.description}
                </p>

                {/* Info */}
                <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaBuilding className="text-blue-500" />
                        <span>
                            Floor {room.floor}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <FaUsers className="text-blue-500" />
                        <span>
                            {room.capacity} people
                        </span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mt-5">
                    {visibleAmenities.map(
                        (item) => (
                            <span
                                key={item}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700"
                            >
                                {item}
                            </span>
                        )
                    )}

                    {remainingAmenities > 0 && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                            +{remainingAmenities} more
                        </span>
                    )}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6">
                    <Link
                        href={`/rooms/${room._id}`}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                    >
                        View Details
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </motion.div>

    );
}
