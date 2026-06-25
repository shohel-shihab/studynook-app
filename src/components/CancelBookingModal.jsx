"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import CancelBookingModal from "./CancelBookingModal";

export default function CancelBookingButton({
  bookingId,
}) {
  const router = useRouter();

  const { data: session } =
    authClient.useSession();

  const handleCancel =
    async () => {
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

        const data =
          await res.json();

        if (data.success) {
          toast.success(
            "Booking cancelled"
          );

          router.refresh();
        } else {
          toast.error(
            data.message
          );
        }
      } catch (error) {
        toast.error(
          "Cancellation failed"
        );
      }
    };

  return (
    <CancelBookingModal
      onConfirm={
        handleCancel
      }
    />
  );
}