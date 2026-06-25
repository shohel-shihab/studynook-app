"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function CancelBookingButton({
  bookingId,
}) {
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
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
          "Booking cancelled"
        );

        router.refresh();
      } else {
        toast.error(
          data.message ||
            "Failed to cancel booking"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Cancel Booking
    </button>
  );
}