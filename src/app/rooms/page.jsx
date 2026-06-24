"use client";

import { useEffect, useState } from "react";
import RoomCard from "@/components/RoomCard";
import { Spinner } from "@heroui/react";

const amenitiesOptions = [
  "Wi-Fi",
  "Projector",
  "Whiteboard",
  "Air Conditioning",
  "Power Outlets",
  "Quiet Zone",
  "Soundproofed",
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const fetchRooms = async () => {
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
      `http://localhost:5000/rooms?${params.toString()}`
    );

    const data = await res.json();

    setRooms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Available Study Rooms
        </h1>

        <p className="text-gray-500 mt-2">
          Find the perfect room for your study session.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border rounded-2xl p-6 mb-10 shadow-sm">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search room name..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          />

          <button
            onClick={fetchRooms}
            className="bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-800"
          >
            Apply Filter
          </button>
        </div>

        {/* Amenities */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">
            Amenities
          </h3>

          <div className="flex flex-wrap gap-4">
            {amenitiesOptions.map((amenity) => (
              <label
                key={amenity}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(
                    amenity
                  )}
                  onChange={() =>
                    handleAmenityChange(amenity)
                  }
                />

                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Rooms */}
      {loading ? (
        <div className="flex items-center gap-4">
          <Spinner />
        </div>
      ) : rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <h2 className="text-2xl font-semibold mb-2">
            No rooms found 😢
          </h2>

          <p className="text-gray-500">
            Try adjusting your filters.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-gray-500">
            {rooms.length} room(s) found
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}