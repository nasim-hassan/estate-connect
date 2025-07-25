import Hero from '@/components/ui/Hero';
import FeaturedProperties from '@/components/ui/FeaturedProperties';
import WhyEstateConnect from '@/components/ui/WhyEstateConnect';
import RecentListings from '@/components/ui/RecentListings';
import RecentSales from '@/components/ui/RecentSales';
import Testimonials from '@/components/ui/Testimonials';
import GoogleMapSection from '@/components/ui/GoogleMapSection';

export default function HomePage() {
  return (
    <section>
      <Hero />
      <FeaturedProperties />
      <RecentListings />
      <RecentSales />
      <WhyEstateConnect />
      <Testimonials />
      <GoogleMapSection />
    </section>
  );
}
