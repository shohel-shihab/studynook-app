"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function AddRoomPage() {



  const router = useRouter();

  const [capacity, setCapacity] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const amenities = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const pageInfo = Object.fromEntries(formData.entries());

    const roomData = {
      roomName: pageInfo.roomName,
      description: pageInfo.description,
      image: pageInfo.image,
      floor: pageInfo.floor,
      capacity: Number(capacity),
      hourlyRate: Number(pageInfo.hourlyRate),
      amenities: selectedAmenities,
      ownerId: user.id,
      ownerName: user.name,
      ownerEmail: user.email,
      createdAt: new Date(),
      bookingCount: 0,
    };


    const { data: tokenData } = await authClient.token();
   
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(roomData),
      });

      if (!res.ok) {
        throw new Error("Failed to add room");
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Room added successfully");

        form.reset();
        setCapacity(4);
        setSelectedAmenities([]);

        router.push("/rooms");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add room");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12">
        <div className="mb-10">
          <p className="uppercase tracking-[4px] text-xs text-indigo-600 mb-3">
            Workspace Management
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Add New Room
          </h1>

          <div className="w-20 h-1 bg-indigo-600 mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Room Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Room Name
            </label>

            <input
              type="text"
              name="roomName"
              required
              placeholder="Enter room name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              required
              rows={5}
              placeholder="Describe the room..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Room Image URL
            </label>

            <input
              type="url"
              name="image"
              required
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Floor & Capacity */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Floor
              </label>

              <select
                name="floor"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Floor</option>
                <option>Ground Floor</option>
                <option>1st Floor</option>
                <option>2nd Floor</option>
                <option>3rd Floor</option>
                <option>4th Floor</option>
                <option>5th Floor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Capacity
              </label>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setCapacity((prev) => Math.max(1, prev - 1))
                  }
                  className="h-12 w-12 rounded-xl border border-slate-300 hover:bg-slate-100"
                >
                  -
                </button>

                <span className="text-2xl font-bold w-12 text-center">
                  {capacity}
                </span>

                <button
                  type="button"
                  onClick={() => setCapacity((prev) => prev + 1)}
                  className="h-12 w-12 rounded-xl border border-slate-300 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Hourly Rate ($)
            </label>

            <input
              type="number"
              name="hourlyRate"
              min="1"
              required
              placeholder="5"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Amenities
            </label>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${selectedAmenities.includes(amenity)
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "border-slate-300 hover:border-indigo-500"
                    }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Amenities */}
          {selectedAmenities.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedAmenities.map((item) => (
                <span
                  key={item}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                setCapacity(4);
                setSelectedAmenities([]);
              }}
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}