import React from 'react';

export default function About() {
  return (
    <div className="w-full border-2 border-primary-teal-light rounded-2xl p-6 sm:p-10 flex flex-col gap-10 md:gap-16 bg-white relative z-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center">
        <span className="gradient-primary block md:inline pe-0 md:pe-4">
          MedaCare's Story:
        </span>{' '}
        <span>Get to know us</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <img
            src="./images/about_us.png"
            alt="About MedaCare"
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-6 text-base sm:text-lg md:text-2xl text-gray-600 p-2 md:p-6">
          <p>
            In the heart of Ethiopia's rural communities, access to healthcare
            remains one of the greatest challenges. Many families live miles
            away from the nearest clinic, often waiting days or even weeks for
            medical assistance. Inspired by these stories, MedaCare was born.
          </p>
          <p>
            We are a team of dreamers, doers, and designers who believe that no
            one should be denied care because of where they live. Combining the
            power of artificial intelligence and human-centered design, MedaCare
            bridges the gap between patients and healthcare professionals—even
            in places with no internet connection.
          </p>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 -z-10 w-24 sm:w-32 md:w-40">
        <img src="./images/Vector.png" alt="" className="w-full h-auto" />
      </div>
      <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 -z-10 w-24 sm:w-32 md:w-40">
        <img src="./images/Vector.png" alt="" className="w-full h-auto" />
      </div>
    </div>
  );
}
