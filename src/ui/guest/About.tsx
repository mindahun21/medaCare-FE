import React from 'react';

export default function About() {
  return (
    <section
      id="about"
      className="flex justify-center items-center mx-[83px] relative"
    >
      <div className="w-full p-[2px] rounded-xl bg-gradient-to-r from-[#C5ECFF] to-[#95DDFF]  my-[50px] z-10 mx-[23px] ">
        <div className="w-full flex flex-col bg-gradient-to-br from-[#FFFFFF] to-[#F8FDFF] rounded-[10px] p-[60px] ">
          <h1 className="font-bold text-[33.73px] leading-[42px] text-center">
            <span className="gradient-primary block md:inline pe-0 md:pe-4">
              MedaCare's Story:
            </span>{' '}
            <span>Get to know us</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-[45px]">
            <div className=" md:w-full">
              <img
                src="./images/about_us.png"
                alt="About MedaCare"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col justify-center items-center gap-5 font-semibold text-[16px] leading-[25px] text-neutrals-500 ">
              <p>
                In the heart of Ethiopia's rural communities, access to
                healthcare remains one of the greatest challenges. Many families
                live miles away from the nearest clinic, often waiting days or
                even weeks for medical assistance. Inspired by these stories,
                MedaCare was born.
              </p>
              <p>
                We are a team of dreamers, doers, and designers who believe that
                no one should be denied care because of where they live.
                Combining the power of artificial intelligence and
                human-centered design, MedaCare bridges the gap between patients
                and healthcare professionals—even in places with no internet
                connection.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Background decorations */}
      <div className="absolute top-7 left-0 h-[72px]">
        <img src="./images/Vector.png" alt="" className="w-full h-auto" />
      </div>
      <div className="absolute bottom-7 right-0 h-[72px]">
        <img src="./images/Vector.png" alt="" className="w-full h-auto" />
      </div>
    </section>
  );
}
