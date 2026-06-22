import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookings() {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user;

    const res = await fetch(`http://localhost:5000/booking/${user.id}`)
    const bookings = await res.json();

    const bookingDate = new Date(bookings.bookingDate);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const canCancel =
        bookings.status === "confirmed" &&
        bookingDate >= today;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                My Bookings
            </h1>

            {bookings.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow">
                    <h2 className="text-2xl font-semibold">
                        You have no bookings yet.
                    </h2>
                </div>
            ) : (
                <div className="space-y-5">
                    {bookings.map((booking) => {
                        const bookingDate = new Date(
                            booking.bookingDate
                        );

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        const canCancel =
                            booking.status === "confirmed" &&
                            bookingDate >= today;

                        return (
                            <div
                                key={booking._id}
                                className="bg-white rounded-3xl shadow border p-5"
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    {/* Room Image */}
                                    <img
                                        src={booking.roomImage}
                                        alt={booking.roomName}
                                        className="w-40 h-28 rounded-2xl object-cover"
                                    />

                                    {/* Room Info */}
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold">
                                            {booking.roomName}
                                        </h2>

                                        <p className="text-gray-500 mt-2">
                                            Date: {booking.bookingDate}
                                        </p>

                                        <p className="text-gray-500">
                                            Time: {booking.startTime} -{" "}
                                            {booking.endTime}
                                        </p>

                                        <p className="font-semibold text-indigo-600 mt-2">
                                            Total Cost: $
                                            {booking.totalCost}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${booking.status ===
                                                "cancelled"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    {/* Action */}
                                    <div>

                                        <button

                                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
                                        >
                                            Cancel Booking
                                        </button>

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}