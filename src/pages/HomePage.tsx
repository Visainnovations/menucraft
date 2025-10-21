import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import Hero from '@components/home/Hero';
import Features from '@components/home/Features';
import Testimonials from '@components/home/Testimonials';
import CTA from '@components/home/CTA';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}