import { useSelector } from 'react-redux';
import About from '../ui/guest/About';
import ContactUs from '../ui/guest/ContactUs';
import Footer from '../ui/guest/Footer';
import Header from '../ui/guest/Header';
import Hero from '../ui/guest/Hero';
import HowItWorks from '../ui/guest/HowItWorks';
import Services from '../ui/guest/Services';
import { RootState } from '../data/store';
import PageLoader from '../ui/shared/PageLoader';

export default function Guest() {
  const { loading } = useSelector((state: RootState) => state.auth);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="flex flex-col overflow-y-auto scrollbar-hide font-manrope  guest-bg-gradient">
      <div className="flex flex-col max-w-[1440px] mx-auto px-5">
        <div className="h-[108px]">
          <Header />
        </div>
        <div className="px-[25px] pt-[30px]">
          <Hero />
          <About />
        </div>
      </div>

      <HowItWorks />
      <Services />
      <ContactUs />
      <Footer />
    </div>
  );
}
