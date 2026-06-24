"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { FaStar, FaWifi, FaArrowRight, FaTv } from "react-icons/fa";
import { MdMeetingRoom } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import Link from "next/link";

export default function FeatureCard({ feature }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-[30px] bg-white shadow-lg"
        >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    className="h-full w-full"
                >
                    <Image
                        src={feature.image}
                        alt="Room"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>

            {/* Content */}
            <div className="space-y-5 p-6">
                {/* Rating */}
                <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-400 text-lg" />
                    <span className="text-lg font-medium">4.8</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900">
                    {feature.roomName}
                </h2>

                {/* Info */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                        <MdMeetingRoom className="text-lg" />
                        <span className="text-lg">{feature.floor}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <HiUsers className="text-lg" />
                        <span className="text-lg">Capacity: {feature.capacity}</span>
                    </div>
                </div>

                {/* Amenities */}

                <div className="flex flex-wrap gap-2">
                    {
                        feature.amenities.map(ame => <span key={ame} className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
                            <FaWifi />
                           {ame}
                        </span>)
                    }
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h3 className="text-4xl font-bold text-indigo-600">
                            $10
                        </h3>
                        <p className="text-gray-500">per hour</p>
                    </div>

                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            x: 5,
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-4 font-semibold text-white"
                    >
                        <Link href={`/rooms/${feature._id}`}>View Details</Link>
                        <FaArrowRight />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}