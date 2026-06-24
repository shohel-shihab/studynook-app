import FeatureCard from "./FeatureCard";
import RoomCard from "./RoomCard";

async function getFeaturedRooms() {
  const res = await fetch(
    "http://localhost:5000/featured-rooms",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function FeaturedRooms() {
  const rooms =
    await getFeaturedRooms();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl font-bold">
            Available Study Rooms
          </h2>

          <p className="text-gray-500 mt-2">
            Discover our latest study
            spaces designed for
            productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <FeatureCard
              key={room._id}
              room={room}
            />
          ))}
        </div>
      </div>
    </section>
  );
}