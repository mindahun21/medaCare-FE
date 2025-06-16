import React from 'react';
import PrimaryButton from '../shared/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div id="hero" className="flex flex-col text-neutrals-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left side content */}
        <div className="flex flex-col ">
          <h1 className="text-[48px] font-extrabold mt-28 md:max-w-[495px] text-neutrals-900 leading-[56px] ">
            <span className="gradient-primary pe-2">MedaCare -</span>
            <span>Your health anywhere.</span>
          </h1>
          <p className="mt-7 md:max-w-[590px] font-bold text-[16.8px] leading-[25.3px] tracking-normal text-neutrals-700">
            <span className="text-primary-teal pe-1">
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
          <div className="mt-[56px]">
            <PrimaryButton
              text="GET STARTED"
              onClick={() => navigate('/choose-accounttype')}
            />
          </div>
          <div className="flex flex-col ">
            <p className="mt-[69px] text-neutrals-300 font-semibold text-[16px] leading-[25px] tracking-normal ">
              Trusted by millions across the globe:
            </p>
            <div className="mt-4 flex h-[46.38] w-[407px] justify-between items-center">
              <span className="w-[46.38px] ">
                <img
                  className="h-full w-full"
                  src="/icons/ri_amazon-fill.png"
                  alt="amazon icon"
                />
              </span>
              <span className="w-[46.38px] ">
                <img
                  className="h-full w-full"
                  src="/icons/ic_baseline-apple.png"
                  alt="apple icon"
                />
              </span>
              <span className="w-[46.38px] ">
                <img
                  className="h-full w-full"
                  src="/icons/uim_google.png"
                  alt="google icon"
                />
              </span>
              <span className="w-[46.38px] ">
                <img
                  className="h-full w-full"
                  src="/icons/cib_notion.png"
                  alt="notion icon"
                />
              </span>
              <span className="w-[46.38px] ">
                <img
                  className="h-full w-full"
                  src="/icons/mdi_spotify.png"
                  alt="spotify icon"
                />
              </span>
              <span className="w-[46.38px] ">
                <img
                  className="h-full w-full"
                  src="/icons/mdi_slack.png"
                  alt="slack icon"
                />
              </span>
            </div>
          </div>
        </div>

        {/* Right side image */}
        <div className="h-[692px] hidden md:flex">
          <div className="w-[598px] h-[590px]">
            <img
              src="./images/doctor-hero.png"
              alt="hero"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center items-center mx-auto p-[42px] gap-[52px]">
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
    <div className="flex flex-col text-center justify-center ">
      <span className="gradient-primary font-extrabold text-[50.6px] leading-[54.8px] tracking-normal">
        {status}
      </span>
      <span className="text-neutrals-500 font-semibold text-[14.7px] leading-[25px] tracking-normal">
        {description}
      </span>
    </div>
  );
}
