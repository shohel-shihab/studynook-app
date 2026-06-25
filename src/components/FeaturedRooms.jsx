import FeatureCard from "./FeatureCard";


export default async function FeaturedRooms() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-rooms`,
    {
      cache: "no-store",
    }
  );
  const rooms = await res.json();

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