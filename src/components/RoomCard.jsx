
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaBuilding, FaStar, FaUsers, FaWifi } from "react-icons/fa";
const RoomCard = ({room}) => {
    return (
        <div>
            <motion.div
                key={room._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
            >
                <img
                    src={room.image}
                    alt={room.roomName}
                    className="w-full h-64 object-cover"
                />

                <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <FaStar className="text-yellow-400" />
                        <span>{room.rating || 4.8}</span>
                    </div>

                    <h2 className="text-xl font-bold mb-4">
                        {room.roomName}
                    </h2>

                    <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                            <FaBuilding />
                            {room.floor}
                        </div>

                        <div className="flex items-center gap-2">
                            <FaUsers />
                            Capacity: {room.capacity}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {room.amenities?.map((amenity) => (
                            <span
                                key={amenity}
                                className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs"
                            >
                                <FaWifi size={10} />
                                {amenity}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-indigo-600">
                                ${room.hourlyRate}
                            </h3>

                            <p className="text-sm text-gray-500">
                                per hour
                            </p>
                        </div>

                        <Link href={`/rooms/${room._id}`}>
                            <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl">
                                View Details
                                <FaArrowRight />
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default RoomCard
