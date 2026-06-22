"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const BookingModal = ({ isOpen, onClose, room }) => {
    if (!isOpen) return null;
    const timeSlots = Array.from(
        { length: 13 },
        (_, i) =>
            `${String(i + 8).padStart(2, "0")}:00`
    );

    const {
        data: session,
    } = authClient.useSession()
    const user = session?.user;

    const handleBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const pageInfo = Object.fromEntries(formData.entries());
        const startHour = Number(pageInfo.startTime.split(":")[0]);
        const endHour = Number(pageInfo.endTime.split(":")[0]);
        const totalCost = (endHour - startHour) * room.hourlyRate;

        const bookingInfo = {
            ...pageInfo,
            totalCost,
            roomId: room._id,
            roomName: room.roomName,
            roomImage: room.image,
            userId: user?.id,
            userName: user?.name,
            userEmail: user?.email,
        };
        try {
            const res = await fetch(
                "http://localhost:5000/booking",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(bookingInfo),
                }
            );
            const data = await res.json();
            if(data.success) {
                toast.success("Room Booked Successfully")
                e.target.reset();
                 onClose();
            }else {
                toast.error("Booking Failed!")
            }
        } catch (error) {
            toast.error("Something went wrong")
        }

    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="border-b px-8 py-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Book Room
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {room?.roomName}
                    </p>
                </div>

                {/* Body */}
                <form onSubmit={handleBooking}>
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block mb-2 font-medium">
                                    Booking Date
                                </label>

                                <input
                                    name="bookingDate"
                                    type="date"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Start Time
                                </label>

                                <select
                                    name="startTime"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                                >
                                    <option value="">
                                        Select Start Time
                                    </option>

                                    {timeSlots.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    End Time
                                </label>

                                <select
                                    name="endTime"
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3"
                                >
                                    <option value="">
                                        Select End Time
                                    </option>

                                    {timeSlots.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium">
                                    Total Cost
                                </label>

                                <div className="h-[50px] flex items-center px-4 rounded-xl bg-indigo-50 border border-indigo-100">
                                    <span className="text-xl font-bold text-indigo-600">
                                        ${room.hourlyRate}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block mb-2 font-medium">
                                Special Note
                            </label>

                            <textarea
                                name="specialNote"
                                rows={4}
                                placeholder="Any special requirements..."
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none"
                            />
                        </div>
                    </div>

                    <div className="border-t p-6 flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 border rounded-xl"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </form>

                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default BookingModal;