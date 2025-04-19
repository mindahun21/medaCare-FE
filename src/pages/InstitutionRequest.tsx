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
  const [currentStep, setCurrentStep] = useState(2);
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
    <div className="min-h-screen w-full gradient-teal-light flex justify-center items-center overflow-y-auto scrollbar-hide">
      <div className="mx-4 bg-white min-h-[700px flex flex-col items-center justify-center w-full sm:w-[500px] md:w-[700px] rounded-2xl shadow-lg my-4">
        <div className=" flex flex-col gap-5 justify-center items-center sm:py-10 h-full w-full max-w-[500px] ">
          <AuthBanner />
          <h1 className="text-4xl font-semibold text-center gradient-primary">
            Request Account
          </h1>

          {/* Stepper */}
          <div className="flex w-full  items-center justify-between my-4">
            {Array.from({ length: totalStep }, (_, index) => {
              const step = index + 1;
              const isCompleted = currentStep > step;
              const isActive = currentStep === step;

              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'text-4xl'
                          : 'text-white text-sm font-bold shadow-md transition-all duration-300'
                      }  ${
                        isCompleted
                          ? 'text-primary-teal'
                          : isActive
                          ? 'gradient-teal'
                          : 'bg-gray-300'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon fontSize="large" />
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
                      className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                        currentStep > step ? 'bg-primary-teal' : 'bg-gray-300'
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
                className="bg-primary-teal-light px-4 py-2 text-secondary-burgandy rounded-md font-bold"
                onClick={gotoPrev}
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep == totalStep ? (
              <PrimaryButton text="Finish" onClick={handleSubmit} />
            ) : (
              <PrimaryButton text="Next" onClick={goToNextStep} />
            )}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-primary-teal text-2xl">
            Already have an account?
            <Link
              to="/login"
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
