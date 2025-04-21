import React from 'react';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

const services = [
  {
    icon: VideoChatIcon,
    title: 'Online Consultations',
    description:
      'Consult with top doctors across various specialties via video or chat. It’s secure, private, and convenient.',
  },
  {
    icon: CalendarMonthIcon,
    title: 'Booking Appointment',
    description:
      'Choose the best time for an in-person visit with our scheduling system, or book an online consultation.',
  },
  {
    icon: MedicationIcon,
    title: 'Prescriptions',
    description:
      'Receive and renew prescriptions digitally after your consultation with our specialists.',
  },
  {
    icon: MedicalInformationIcon,
    title: 'Medical Notes',
    description:
      'Obtain medical notes for work or school with just a few clicks — hassle-free and fast.',
  },
  {
    icon: MedicationLiquidIcon,
    title: 'Medicine Refills',
    description:
      'Skip pharmacy lines by ordering refills online and have your meds delivered straight to your door.',
  },
];

export default function Services() {
  return (
    <section id="services" className="pt-[50px] bg-white">
      <div className="mx-auto flex flex-col items-center text-neutrals-900 py-8">
        {/* Title */}
        <h1 className="text-[42px] leading-[55px] font-bold text-center">
          Top
          <span className="gradient-primary px-2">Services</span>
          we offer
        </h1>

        {/* Subtitle */}
        <p className="text-center pt-[34px] text-neutrals-300 w-[860px] text-[17px] leading-[25px]">
          In today&#x27;s fast-paced world, your health deserves the utmost
          attention and convenience. MedaCare brings a suite of integrated
          services to support your needs digitally:
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-8 w-full relative mt-[54px] max-w-[1029px]">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              className={` col-span-1 ${
                index == 0
                  ? 'md:col-span-5'
                  : index == 1
                  ? 'md:col-span-4'
                  : 'md:col-span-3'
              }`}
            />
          ))}

          {/* Decorative Images */}
          <img
            src="./images/group.png"
            alt=""
            className="absolute w-[150px] hidden md:block -top-8 -left-20 "
          />
          <img
            src="./images/group.png"
            alt=""
            className="absolute w-[150px] -bottom-8 -right-20 hidden md:block"
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className: string;
}) {
  return (
    <div
      className={`rounded-[25px] bg-gradient-to-r from-[#C5ECFF] to-[#95DDFF] transition-transform hover:scale-[1.02] duration-300 p-[2px] ${className}`}
    >
      <div className="w-full bg-white z-10 rounded-[25px] p-[42px]">
        {Icon && (
          <span className="text-primary-blues-700 ">
            <Icon style={{ width: 42, height: 42 }} />
          </span>
        )}
        <h3 className="text-[21px] pt-[16px] leading-[21px] font-bold text-primary-blues-700">
          {title}
        </h3>
        <p className=" pt-[16px] text-neutrals-500 text-[14px] leading-[25px] font-semibold ">
          {description}
        </p>
      </div>
    </div>
  );
}
