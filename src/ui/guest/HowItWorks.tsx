import React from 'react';
import PrimaryButton from '../shared/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    number: 1,
    title: 'Create Your Profile',
    description:
      'Sign up and fill in your medical history securely. Setting up your profile this way would ensure that you stay up-to-date with your medical processes.',
  },
  {
    number: 2,
    title: 'Choose Your Service',
    description:
      'Select from our range of services and book a consultation. Booking a consultation with MedaCare is fairly simple and straight-forward.',
  },
  {
    number: 3,
    title: 'Meet Your Doctor',
    description:
      'Have a virtual consultation with one of our certified specialists, or go for a physical visit to the doctor in case you opted for a physical check-up.',
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const roles = [
    {
      key: 'patients',
      image: './images/patient.png',
      decorations: ['./images/group.png', './images/group.png'],
      onClick: () => {
        navigate('/patient/redirect');
      },
    },
    {
      key: 'physicians',
      image: './images/doctor_image_bg.png',
      decorations: [],
      onClick: () => {
        navigate('/register');
      },
    },
    {
      key: 'institutions',
      image: './images/institution_image.png',
      decorations: [],
      onClick: () => {
        navigate('/institution-request');
      },
    },
  ];
  return (
    <section id="how-it-works" className="w-full">
      {roles.map((role, index) => (
        <RoleSection
          key={role.key}
          role={role.key}
          image={role.image}
          decorations={role.decorations}
          onClick={role.onClick}
          reversed={index % 2 === 0}
          background={index % 2 === 0 ? 'bg-primary-teal-surface' : ''}
        />
      ))}
    </section>
  );
}

function RoleSection({
  role,
  image,
  decorations = [],
  onClick,
  reversed = false,
  background = '',
}: {
  role: string;
  image: string;
  decorations?: string[];
  onClick: () => void;
  reversed?: boolean;
  background?: string;
}) {
  return (
    <div className={background}>
      <div className="mx-auto flex flex-col items-center py-[32px]">
        {/* Heading */}
        <h1 className="text-center font-bold text-[42px] leading-[45px]">
          How <span className="gradient-primary px-2">our platform</span> works
          for <span className="gradient-primary px-2">{role}</span>
        </h1>
        <p className="text-center font-semibold text-[17px] pt-[33px] text-neutrals-300 max-w-[808px]">
          Navigating your healthcare journey with MedaCare is seamless. Just
          follow these steps below to proceed with your selected services. You
          can also see our FAQ section for more guidance:
        </p>

        {/* Content */}
        <div
          className={`flex flex-col-reverse lg:flex-row gap-20 pt-[54px] ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image Block */}
          <div>
            <div className="relative flex justify-center items-start py-4 px-20">
              <img
                src={image}
                alt={`${role} visual`}
                className="w-full max-w-md"
              />
              {decorations.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className={`absolute ${
                    i === 0 ? 'left-0 top-0' : 'bottom-0 right-0'
                  }`}
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* Steps + CTA */}
          <div className="w-[443px] flex flex-col items-start">
            <Steps />
            <div className="pt-[21px] pl-[49px]">
              <PrimaryButton
                text={role == 'institutions' ? 'REQUEST' : 'REGISTER'}
                className="px-[62px] py-[8px]"
                onClick={() => onClick()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Steps() {
  return (
    <div className="w-full">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`relative pl-[49px] pb-[38px] ${
            index !== steps.length - 1
              ? 'border-l-2 border-dashed border-primary-blues-200'
              : ''
          }`}
        >
          <div className="absolute -left-10 top-0 w-[54px] h-[54px] text-white rounded-full gradient-teal font-bold text-[34px] leading-[34px] flex justify-center items-center">
            {step.number}
          </div>
          <h3 className="font-bold text-neutrals-900 text-[34px] leading-[42px] pb-[10px]">
            {step.title}
          </h3>
          <p className="font-semibold text-[14px] leading-[25px] text-neutrals-500">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
