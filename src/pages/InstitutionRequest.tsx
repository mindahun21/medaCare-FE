import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
  InstitutionRequestSchema,
  InstitutionRequestSchemaType,
} from '../features/authentication/InstitutionRequestSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InstitutionRequestFormOne from '../features/authentication/components/InstitutionRequestFormOne';
import InstitutionRequestFormTwo from '../features/authentication/components/InstitutionRequestFormTwo';
import AuthBanner from '../features/authentication/components/AuthBanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrimaryButton from '../ui/shared/PrimaryButton';
import { Link } from 'react-router';

export default function InstitutionRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalStep = 2;

  const methods = useForm<InstitutionRequestSchemaType>({
    resolver: zodResolver(InstitutionRequestSchema),
    defaultValues: {},
    mode: 'onTouched',
  });
  const goToNextStep = async () => {
    let isStepValid = true;
    if (currentStep === 1) {
      isStepValid = await methods.trigger([]);
    }
    if (!isStepValid) return;

    if (currentStep < totalStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const gotoPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <InstitutionRequestFormOne />;
      case 2:
        return <InstitutionRequestFormTwo />;
      default:
        return <InstitutionRequestFormOne />;
    }
  };
  const handleSubmit = () => {};
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#DEF1FF] to-[#FFF] flex justify-center items-center overflow-y-auto scrollbar-hide  ">
      <div className="mx-4 bg-white w-[800px] flex flex-col items-center justify-center px-[150px]">
        <div className=" flex flex-col gap-[11px] justify-center items-center h-full w-full  ">
          <AuthBanner />
          <h1 className="font-semibold text-[40px] leading-[70px] gradient-primary  ">
            Request Account
          </h1>

          {/* Stepper */}
          <div className="flex  items-center my-[11px]">
            {Array.from({ length: totalStep }, (_, index) => {
              const step = index + 1;
              const isCompleted = currentStep > step;
              const isActive = currentStep === step;

              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-[22px] h-[22px] rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'text-4xl'
                          : 'text-white text-sm font-bold shadow-md transition-all duration-300'
                      }  ${
                        isCompleted
                          ? 'text-primary-blues-500'
                          : isActive
                          ? 'bg-primary-blues-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon
                          style={{ height: '22px', width: '22px' }}
                        />
                      ) : (
                        step
                      )}
                    </div>
                    <span className="text-xs text-gray-600 mt-1">
                      Step {step}
                    </span>
                  </div>
                  {step !== totalStep && (
                    <div
                      className={`border-b-[1px] w-[112px] rounded-full transition-all duration-300 ${
                        currentStep > step
                          ? 'text-primary-blues-500'
                          : 'bg-[#BDBDBD] '
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {/* Form */}
          <FormProvider {...methods}>{renderForm()}</FormProvider>
          {/* Navigation */}
          <div className="w-full flex justify-between mt-4">
            {currentStep > 1 && (
              <button
                className="bg-primary-teal-light px-10 py-2 text-secondary-burgandy rounded-md font-bold"
                onClick={gotoPrev}
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep == totalStep ? (
              <PrimaryButton
                text="Finish"
                className="px-10"
                onClick={handleSubmit}
              />
            ) : (
              <PrimaryButton
                text="Next"
                className="px-10"
                onClick={goToNextStep}
              />
            )}
          </div>
        </div>
        <div className="my-7">
          <p className="text-primary-teal text-2xl">
            Already have an account?
            <Link
              to="/login?prev=institution-request"
              className="text-secondary-burgandy text-3xl hover:underline ps-3"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
