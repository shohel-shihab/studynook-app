"use client";

import { useState } from "react";

export default function AddRoomPage() {
  const [capacity, setCapacity] = useState(4);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = [
    "WiFi",
    "Projector",
    "Whiteboard",
    "Air Conditioning",
    "Power Outlets",
    "Quiet Zone",
    "Smart TV",
    "Video Conference Setup",
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
    const formData = new FormData(e.currentTarget);
    const pageInfo = Object.fromEntries(formData.entries());
   
    const roomData = {
      ...pageInfo,
      capacity,
      amenities: selectedAmenities,
      hourlyRate: Number(pageInfo.hourlyRate),
    };
     console.log(roomData);

  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12">
        {/* Header */}
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

          {/* Floor + Capacity */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Floor */}
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

            {/* Capacity */}
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
                  className="h-12 w-12 rounded-xl border border-slate-300 text-xl font-semibold hover:bg-slate-100"
                >
                  −
                </button>

                <div className="text-2xl font-bold w-12 text-center">
                  {capacity}
                </div>

                <button
                  type="button"
                  onClick={() => setCapacity((prev) => prev + 1)}
                  className="h-12 w-12 rounded-xl border border-slate-300 text-xl font-semibold hover:bg-slate-100"
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
              required
              min="1"
              placeholder="50"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-4">
              Amenities
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Selected Amenities
              </p>

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
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="reset"
              className="px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}