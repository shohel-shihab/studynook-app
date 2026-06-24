"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";


export default function DeleteRoomButton({
    roomId,
}) {
    const router = useRouter();

    const { data: session } =
        authClient.useSession();

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this room?"
        );

        if (!confirmed) return;

        const res = await fetch(
            `http://localhost:5000/rooms/${roomId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    userId:
                        session?.user?.id,
                }),
            }
        );

        const data = await res.json();

        if (data.success) {
            toast.success(
                "Room deleted successfully"
            );

            setTimeout(() => {
                router.push("/rooms");
                router.refresh();
            }, 1000);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
            Delete Room
        </button>
    );
}