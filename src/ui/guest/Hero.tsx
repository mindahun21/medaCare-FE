import React from 'react';
import PrimaryButton from '../shared/PrimaryButton';

export default function Hero() {
  return (
    <div className="flex flex-col pt-40 px-4 sm:px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side content */}
        <div className="flex flex-col gap-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold">
            <span className="gradient-primary pe-2">MedaCare -</span>
            <span>Your health anywhere.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl">
            <span className="text-primary-teal pe-2">
              Empowering Your Health at Every Step.
            </span>
            Experience personalized medical care from the comfort of your home.
            Connect with
            <span className="text-primary-teal px-2">certified doctors</span>,
            manage prescriptions, and schedule appointments with ease. Ready to
            take control of your health?
            <span className="text-primary-teal px-2">Get Started</span> or Book
            an Appointment today.
          </p>
          <div className="mt-6">
            <PrimaryButton text="GET STARTED" />
          </div>
        </div>

        {/* Right side image */}
        <div className="flex items-start justify-center">
          <img
            src="./images/doctor-hero.png"
            alt="hero"
            className="w-[300px] sm:w-[400px] md:w-[500px] h-auto"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-10 mt-12 md:mt-16 px-4">
        <Stat status="10,000+" description="Successful Consultations" />
        <Stat status="2,500+" description="Healthcare Professionals" />
        <Stat status="98%" description="Patient Satisfaction Rate" />
        <Stat status="200+" description="Patient Satisfaction Rate" />
      </div>
    </div>
  );
}

function Stat({
  status,
  description,
}: {
  status: string;
  description: string;
}) {
  return (
    <div className="flex flex-col text-center justify-center">
      <span className="gradient-primary text-5xl sm:text-6xl md:text-7xl font-extrabold">
        {status}
      </span>
      <span className="text-gray-400 text-lg sm:text-xl">{description}</span>
    </div>
  );
}
