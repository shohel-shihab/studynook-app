import Image from "next/image";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";



export default async function RoomDetailsPage({ params }) {
  const { id } = await params
  const {token} = await auth.api.getToken({
    headers:await headers()
  })
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
      headers:{
        authorization:`Bearer ${token}`
      }
    },
    {
      cache: "no-store",
    }
  );
  const room = await res.json();

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative h-[450px]">
          <Image
            src={room.image}
            alt={room.roomName}
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {room.roomName}
          </h1>

          <p className="mt-4 text-gray-600">
            {room.description}
          </p>

          <div className="space-y-3 mt-6">
            <p>
              <strong>Floor:</strong> {room.floor}
            </p>

            <p>
              <strong>Capacity:</strong>{" "}
              {room.capacity}
            </p>

            <p>
              <strong>Hourly Rate:</strong> $
              {room.hourlyRate}
            </p>

            <p>
              <strong>Bookings:</strong>{" "}
              {room.bookingCount || 0}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">
              Amenities
            </h3>

            <div className="flex flex-wrap gap-2">
              {room.amenities?.map(
                (amenity) => (
                  <span
                    key={amenity}
                    className="bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {amenity}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-8">
            <BookingModal room={room} />
          </div>
        </div>
      </div>
    </section>
  );
}