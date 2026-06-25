
import FeatureCard from "./FeatureCard"
const FeaturePost = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/features`, {
        cache: "no-store",
    });

    const featurePost = await res.json();

    return (
        <div>
            <div className="text-center py-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Available Study Rooms
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-base md:text-lg">
                    Discover comfortable and fully equipped study spaces designed for focused
                    learning, group discussions, and productive work sessions. Find the perfect
                    room that matches your needs and book it instantly.
                </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                {featurePost.slice(0, 6).map((feature) => (
                    <FeatureCard
                        key={feature._id}
                        feature={feature}
                    />
                ))}
            </div>
        </div>
    )
}

export default FeaturePost
