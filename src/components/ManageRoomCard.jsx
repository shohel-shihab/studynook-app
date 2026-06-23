"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ManageRoomCard({
    room,
    handleDelete,
}) {
    const { data: session } = authClient.useSession();

    if (session?.user?.id !== room?.userId) {
        return null;
    }

    return (
        <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
            <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-rose-500">
                    Your Listing
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Manage this space
                </h2>

                <p className="mt-3 text-gray-500">
                    Update details or remove the listing from StudyNook.
                </p>
            </div>

            <div className="h-px bg-gray-200"></div>

            <div className="space-y-4 p-5">
                <Link href={`/rooms/edit/${room._id}`}>
                    <button className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 font-semibold text-white hover:opacity-90">
                        <FiEdit2 />
                        Edit
                    </button>
                </Link>

                <button
                    onClick={() => handleDelete(room._id)}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-4 font-semibold text-white hover:opacity-90"
                >
                    <FiTrash2 />
                    Delete
                </button>
            </div>
        </div>
    );
}