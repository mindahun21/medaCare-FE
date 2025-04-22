import React, { useState } from 'react';
import CompleteProfileFormOne from '../features/profile/components/physician/CompleteProfileFormOne';
import CompleteProfileFormThree from '../features/profile/components/physician/CompleteProfileFormThree';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrimaryButton from '../ui/shared/PrimaryButton';
import AuthBanner from '../features/authentication/components/AuthBanner';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CompletePhysicianProfileSchema,
  CompletePhysicianProfileType,
} from '../features/profile/completeProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import CompleteProfileFormTwo from '../features/profile/components/physician/CompleteProfileFormTwo';
import { useMutation } from '@tanstack/react-query';
import { submitPhysicianProfile } from '../features/profile/services/completeProfile';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../data/store';

export default function CompletePhysicianProfile() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const totalStep = 3;

  const methods = useForm<CompletePhysicianProfileType>({
    resolver: zodResolver(CompletePhysicianProfileSchema),
    defaultValues: {
      phoneNumber: '',
    },
    mode: 'onTouched',
  });

  const goToNextStep = async () => {
    let isStepValid = true;
    if (currentStep === 1) {
      isStepValid = await methods.trigger([
        'phoneNumber',
        'gender',
        'dateOfBirth',
      ]);
    } else if (currentStep === 2) {
      isStepValid = await methods.trigger(['nationalId', 'resume']);
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

  const mutation = useMutation({
    mutationFn: submitPhysicianProfile,
    onSuccess: () => {
      navigate('/application-submitted');
    },
    onError: () => {},
  });

  const handleSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    const values = methods.getValues();

    const payload: Partial<CompletePhysicianProfileType> = {
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
      gender: values.gender,
    };
    mutation.mutate(payload);

    navigate('/application-submitted');
  };
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <CompleteProfileFormOne />;
      case 2:
        return <CompleteProfileFormTwo />;
      case 3:
        return <CompleteProfileFormThree />;
      default:
        return <CompleteProfileFormOne />;
    }
  };

  return (
    <div className="min-h-screen w-full gradient-teal-light flex justify-center items-center overflow-y-auto scrollbar-hide">
      <div className="mx-4 bg-white min-h-[700px flex justify-center w-full sm:w-[500px] md:w-[700px] rounded-2xl shadow-lg my-[50px]">
        <div className=" flex flex-col gap-5 justify-center items-center sm:py-10 h-full w-full max-w-[500px] ">
          <AuthBanner />
          <h1 className="text-4xl font-semibold text-center gradient-primary">
            Complete your profile
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
                className="bg-primary-teal-light px-4 py-2 text-secondary-burgandy rounded-md font-bold"
                onClick={gotoPrev}
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep == totalStep ? (
              <PrimaryButton text="COMPLETE" onClick={handleSubmit} />
            ) : (
              <PrimaryButton text="Next" onClick={goToNextStep} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
