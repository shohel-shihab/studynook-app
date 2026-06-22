"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaSearch,
    FaStar,
    FaUsers,
    FaBuilding,
    FaArrowRight,
    FaWifi,
} from "react-icons/fa";
import Link from "next/link";
import RoomCard from "@/components/RoomCard";

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const amenitiesList = [
        "WiFi",
        "Projector",
        "Whiteboard",
        "Air Conditioning",
        "Smart TV",
        "Quiet Zone",
    ];

    const toggleAmenity = (amenity) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((item) => item !== amenity)
                : [...prev, amenity]
        );
    };

    const fetchRooms = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            if (search) params.append("search", search);
            if (minPrice) params.append("minPrice", minPrice);
            if (maxPrice) params.append("maxPrice", maxPrice);

            if (selectedAmenities.length > 0) {
                params.append(
                    "amenities",
                    selectedAmenities.join(",")
                );
            }

            const res = await fetch(
                `http://localhost:5000/rooms?${params.toString()}`,
                {
                    cache: "no-store",
                }
            );

            const data = await res.json();

            setRooms(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <section className="bg-gradient-to-r from-indigo-600 to-violet-600 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Explore Study Rooms
                    </h1>

                    <p className="text-indigo-100">
                        Discover modern study spaces and meeting rooms.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Filter */}
                <div className="bg-white rounded-3xl shadow-lg p-6 mb-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Search Room
                            </label>

                            <div className="relative">
                                <FaSearch className="absolute left-4 top-4 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder="Room name..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border rounded-xl py-3 pl-10 pr-4"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Min Price
                            </label>

                            <input
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="w-full border rounded-xl py-3 px-4"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Max Price
                            </label>

                            <input
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="w-full border rounded-xl py-3 px-4"
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={fetchRooms}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                        {amenitiesList.map((amenity) => (
                            <button
                                key={amenity}
                                onClick={() => toggleAmenity(amenity)}
                                className={`px-4 py-2 rounded-full border ${selectedAmenities.includes(amenity)
                                    ? "bg-indigo-600 text-white"
                                    : ""
                                    }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Empty State */}
                {rooms.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-3xl font-bold">
                            No Rooms Found
                        </h2>
                    </div>
                )}

                {/* Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {rooms.map((room) => (
                        <RoomCard key={room._id} room={room}></RoomCard>
                    ))}
                </div>
            </div>
        </div>
    );
}