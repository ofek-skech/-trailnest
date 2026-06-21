import Hero from '@/components/home/Hero';
import TrustBar from '@/components/home/TrustBar';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BestSellers from '@/components/home/BestSellers';
import LifestyleBanner from '@/components/home/LifestyleBanner';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import StatsBanner from '@/components/home/StatsBanner';
import Testimonials from '@/components/home/Testimonials';
import Community from '@/components/home/Community';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCategories />
      <BestSellers />
      <LifestyleBanner />
      <WhyChooseUs />
      <StatsBanner />
      <Testimonials />
      <Community />
      <Newsletter />
    </>
  );
}
