import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MylistingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const res = await fetch(
        `http://localhost:5000/booking/${user?.id}`,
        {
            cache: "no-store",
        }
    );
    const roomData = await res.json();
    
   console.log(roomData.length);

    if (roomData.length === -1) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">
                        No Rooms Found
                    </h2>

                    <p className="text-gray-500 mt-2">
                        You haven't added any rooms yet.
                    </p>

                    <Link
                        href="/add-room"
                        className="inline-block mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl"
                    >
                        Add New Room
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">
                My Listings
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roomData.map((room) => (
                    <div
                        key={room._id}
                        className="bg-white rounded-3xl shadow-lg overflow-hidden"
                    >
                        <img
                            src={room.image}
                            alt={room.roomName}
                            className="w-full h-56 object-cover"
                        />

                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-bold">
                                    {room.roomName}
                                </h2>

                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                                    Active
                                </span>
                            </div>

                            <div className="mt-4 space-y-2">
                                <p>
                                    <span className="font-medium">
                                        Floor:
                                    </span>{" "}
                                    {room.floor}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Capacity:
                                    </span>{" "}
                                    {room.capacity}
                                </p>

                                <p>
                                    <span className="font-medium">
                                        Rate:
                                    </span>{" "}
                                    ${room.hourlyRate}/hr
                                </p>
                            </div>

                            <div className="flex gap-3 mt-5">
                                <Link
                                    href={`/dashboard/my-listings/update/${room._id}`}
                                    className="flex-1 bg-indigo-600 text-white text-center py-3 rounded-xl"
                                >
                                    Update
                                </Link>

                                <button className="flex-1 bg-red-500 text-white py-3 rounded-xl">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MylistingPage;