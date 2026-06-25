import EditRoomForm from "@/components/EditRoomForm";

export default async function EditRoomPage({ params }) {
    const {id} = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`,
        {
            cache: "no-store",
        }
    );
    const room= await res.json();

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">
                Edit Room
            </h1>

            <EditRoomForm room={room} />
        </div>
    );
}