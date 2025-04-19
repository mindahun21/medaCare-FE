import React from 'react';
import PrimaryButton from '../shared/PrimaryButton';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full">
      {['patients', 'physicians', 'institutions'].map((role, index) => (
        <div
          key={role}
          className={`${
            index % 2 === 0 ? 'bg-primary-teal-surface' : ''
          } py-20`}
        >
          <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-10">
            {/* Header */}
            <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-800">
              How <span className="gradient-primary px-2">our platform</span>{' '}
              works for <span className="gradient-primary px-2">{role}</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary-gray-light text-center max-w-3xl">
              Navigating your healthcare journey with MedaCare is seamless. Just
              follow these steps below to proceed with your selected services.
            </p>

            {/* Content Block */}
            <div
              className={`flex flex-col-reverse lg:flex-row ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              } items-center justify-between gap-10 w-full`}
            >
              {/* Image Block */}
              <div className="w-full lg:w-1/2 relative flex justify-center">
                <img
                  src={
                    role === 'patients'
                      ? './images/patient.png'
                      : role === 'physicians'
                      ? './images/doctor_image_bg.png'
                      : './images/institution_image.png'
                  }
                  alt={`${role} visual`}
                  className="w-full max-w-md"
                />
                {/* Decorations */}
                {role === 'patients' && (
                  <>
                    <img
                      src="./images/group.png"
                      className="absolute top-5 -left-10 w-16 md:w-24"
                      alt=""
                    />
                    <img
                      src="./images/group.png"
                      className="absolute bottom-5 -right-10 w-16 md:w-24"
                      alt=""
                    />
                  </>
                )}
              </div>

              {/* Steps + CTA */}
              <div className="w-full lg:w-1/2 flex flex-col items-center gap-6">
                <Steps />
                <PrimaryButton text="REGISTER" className="text-xl py-4 px-10" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

const steps = [
  {
    number: 1,
    title: 'Create Your Profile',
    description:
      'Sign up and fill in your medical history securely to stay up-to-date with your medical processes.',
  },
  {
    number: 2,
    title: 'Choose Your Service',
    description:
      'Select from our range of services and book a consultation. It’s simple and straight-forward.',
  },
  {
    number: 3,
    title: 'Meet Your Doctor',
    description:
      'Have a virtual consultation with one of our certified specialists, or visit physically if needed.',
  },
];

function Steps() {
  return (
    <div className="w-full max-w-xl">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`relative pl-20 pb-10 ${
            index !== steps.length - 1
              ? 'border-l-2 border-dashed border-teal-300'
              : ''
          }`}
        >
          {/* Step Number */}
          <div className="absolute -left-8 top-0 w-14 h-14 text-white text-2xl flex items-center justify-center font-bold rounded-full gradient-teal">
            {step.number}
          </div>
          {/* Step Content */}
          <h3 className="text-2xl font-semibold text-gray-800">{step.title}</h3>
          <p className="text-gray-600 text-lg leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
