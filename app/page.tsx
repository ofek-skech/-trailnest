import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BestSellers from '@/components/home/BestSellers';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Reviews from '@/components/home/Reviews';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <BestSellers />
      <WhyChooseUs />
      <Reviews />
      <Newsletter />
    </>
  );
}
