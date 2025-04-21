import About from '../ui/guest/About';
import ContactUs from '../ui/guest/ContactUs';
import Footer from '../ui/guest/Footer';
import Header from '../ui/guest/Header';
import Hero from '../ui/guest/Hero';
import HowItWorks from '../ui/guest/HowItWorks';
import Services from '../ui/guest/Services';

export default function Guest() {
  return (
    <div className="guest-bg-gradient">
      <div className="flex flex-col overflow-y-auto scrollbar-hide font-manrope ">
        <div className="flex flex-col pt-[30px] max-w-[1440px] mx-auto">
          <div className="h-[108px]">
            <Header />
          </div>
          <Hero />
          <About />
        </div>

        <HowItWorks />
        <Services />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
}
