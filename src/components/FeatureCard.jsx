"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaChair,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";

export default function FeatureCard({ room }) {
  const amenities = room.amenities || [];

  const visibleAmenities = amenities.slice(0, 3);

  const remaining = amenities.length - 3;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
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
        y: -8,
      }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={room.image}
          alt={room.roomName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
          ${room.hourlyRate}/hr
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900">
          {room.roomName}
        </h3>

        {/* Description */}
        <p className="text-gray-500 mt-3 line-clamp-3">
          {room.description}
        </p>

        {/* Info */}
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <FaLayerGroup className="text-blue-500" />
            <span>
              Floor {room.floor}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <FaChair className="text-blue-500" />
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
                className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium"
              >
                {item}
              </span>
            )
          )}

          {remaining > 0 && (
            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
              +{remaining} more
            </span>
          )}
        </div>

        {/* Button */}
        <div className="mt-auto pt-6">
          <Link
            href={`/rooms/${room._id}`}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
          >
            View Details
            <FaArrowRight className="text-sm" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}