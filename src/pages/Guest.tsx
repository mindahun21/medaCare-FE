import About from '../ui/guest/About';
import ContactUs from '../ui/guest/ContactUs';
import Header from '../ui/guest/Header';
import Hero from '../ui/guest/Hero';
import HowItWorks from '../ui/guest/HowItWorks';
import Services from '../ui/guest/Services';

export default function Guest() {
  return (
    <div className="flex flex-col overflow-y-auto scrollbar-hide">
      <div className="flex flex-col max-w-[1300px] mx-auto min-h-screen px-10">
        <Header />
        <Hero />
      </div>
      <section
        id="about"
        className="px-4 sm:px-6 md:px-10 max-w-[1300px] mx-auto flex justify-center items-center py-10 md:py-20 relative overflow-hidden"
      >
        <About />
      </section>
      <HowItWorks />
      <Services />
      <ContactUs />
    </div>
  );
}
