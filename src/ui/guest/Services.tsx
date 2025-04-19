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
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-12">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-center">
          Top
          <span className="gradient-primary px-2">Services</span>
          we offer
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-center text-secondary-gray-light max-w-3xl">
          In today&#x27;s fast-paced world, your health deserves the utmost
          attention and convenience. MedaCare brings a suite of integrated
          services to support your needs digitally:
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full relative">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}

          {/* Decorative Images */}
          <img
            src="./images/group.png"
            alt=""
            className="absolute -top-10 -left-10 w-20 hidden md:block"
          />
          <img
            src="./images/group.png"
            alt=""
            className="absolute -bottom-10 -right-10 w-20 hidden md:block"
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
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="border-2 border-primary-teal-light rounded-2xl p-6 md:p-8 flex flex-col gap-4 bg-white shadow-md transition-transform hover:scale-[1.02] duration-300">
      {Icon && (
        <span className="text-primary-teal-light">
          <Icon fontSize="large" />
        </span>
      )}
      <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
      <p className="text-base md:text-lg text-secondary-gray">{description}</p>
    </div>
  );
}
