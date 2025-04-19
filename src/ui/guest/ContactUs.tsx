import React from 'react';

export default function ContactUs() {
  return (
    <section id="contact-us" className="flex flex-col">
      <div className="max-w-[1300px] mx-auto px-10 flex flex-col items-center gap-5 text-gray-500">
        <h1 className="text-5xl lg:text-7xl font-bold text-center pt-10">
          Reach our
          <span className="gradient-primary px-2">Help Desk</span>
          for support
        </h1>

        <p className="text-xl lg:text-2xl md:max-w-[600px] text-secondary-gray-light text-center ">
          Questions? Need assistance? Our dedicated support team is here to help
          you every step of the way:
        </p>
      </div>
    </section>
  );
}
