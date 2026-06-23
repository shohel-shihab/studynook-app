import Banner from "@/components/Banner";
import FeaturedAuthors from "@/components/FeaturedAuthors";
import FeaturePost from "@/components/FeaturePost";
import TestimonialSlider from "@/components/TestimonialSlider";
export default function Home() {
  return (
    <div>
      <Banner></Banner>
     <FeaturePost></FeaturePost>
     <TestimonialSlider></TestimonialSlider>
     <FeaturedAuthors></FeaturedAuthors>
    </div>
  );
}
