import Hero from '@/components/home/Hero';
import TrustBadges from '@/components/home/TrustBadges';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import BestSellers from '@/components/home/BestSellers';
import NewArrivals from '@/components/home/NewArrivals';
import Suppliers from '@/components/home/Suppliers';
import SaleHighlights from '@/components/home/SaleHighlights';
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
      <TrustBadges />
      <FeaturedCategories />
      <BestSellers />
      <NewArrivals />
      <Suppliers />
      <SaleHighlights />
      <LifestyleBanner />
      <WhyChooseUs />
      <StatsBanner />
      <Testimonials />
      <Community />
      <Newsletter />
    </>
  );
}
