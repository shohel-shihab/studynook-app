"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const amenitiesOptions = [
    "Wi-Fi",
    "Projector",
    "Whiteboard",
    "Air Conditioning",
    "Power Outlets",
    "Quiet Zone",
    "Soundproofed",
];

export default function EditRoomForm({ room }) {
    const router = useRouter();
    const { data: session } = authClient.useSession();

    const [selectedAmenities, setSelectedAmenities] =
        useState(room.amenities || []);

    const handleAmenityChange = (
        amenity
    ) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter(
                    (item) => item !== amenity
                )
                : [...prev, amenity]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(
            e.target
        );

        const updatedRoom = {
            roomName: formData.get("roomName"),
            description: formData.get("description"),

            image:
                formData.get("image") || room.image,

            floor: formData.get("floor"),

            capacity: Number(
                formData.get("capacity")
            ),

            hourlyRate: Number(
                formData.get("hourlyRate")
            ),

            amenities: selectedAmenities,

            userId: session?.user?.id,
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${room._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(
                    updatedRoom
                ),
            }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
            toast.success("Room updated successfully");

            router.push(
                `/rooms/${room._id}`
            );

            router.refresh();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <input
                name="roomName"
                defaultValue={room.roomName}
                className="w-full border p-3 rounded"
                placeholder="Room Name"
            />

            <textarea
                name="description"
                defaultValue={room.description}
                className="w-full border p-3 rounded"
                placeholder="Description"
            />

            <input
                name="image"
                defaultValue={room.image}
                className="w-full border p-3 rounded"
                placeholder="Image URL"
            />

            <input
                name="floor"
                defaultValue={room.floor}
                className="w-full border p-3 rounded"
                placeholder="Floor"
            />

            <input
                type="number"
                name="capacity"
                defaultValue={room.capacity}
                className="w-full border p-3 rounded"
                placeholder="Capacity"
            />

            <input
                type="number"
                name="hourlyRate"
                defaultValue={room.hourlyRate}
                className="w-full border p-3 rounded"
                placeholder="Hourly Rate"
            />

            <div>
                <h3 className="font-semibold mb-3">
                    Amenities
                </h3>

                <div className="flex flex-wrap gap-4">
                    {amenitiesOptions.map(
                        (amenity) => (
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
                                        handleAmenityChange(
                                            amenity
                                        )
                                    }
                                />

                                {amenity}
                            </label>
                        )
                    )}
                </div>
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                Update Room
            </button>
        </form>
    );
}