import Banner from "@/components/Banner";
import FeaturedAuthors from "@/components/FeaturedAuthors";
import FeaturedRooms from "@/components/FeaturedRooms";
import FeaturePost from "@/components/FeaturePost";
import TestimonialSlider from "@/components/TestimonialSlider";
export default function Home() {
  return (
    <div>
      <Banner></Banner>
     <FeaturedRooms></FeaturedRooms>
     <TestimonialSlider></TestimonialSlider>
     <FeaturedAuthors></FeaturedAuthors>
    </div>
  );
}
