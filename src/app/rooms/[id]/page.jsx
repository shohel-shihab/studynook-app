import RoomDetails from "@/components/RoomDetails";

export default async function Page({ params }) {
     const  {id}  = await params;
  const res = await fetch(
    `http://localhost:5000/rooms/${id}`,
    {
      cache: "no-store",
    }
  );
  const room = await res.json();

  return <RoomDetails room={room} />;
}