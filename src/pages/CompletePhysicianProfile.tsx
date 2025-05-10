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
import { useMessage } from '../contexts/MessageContext';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';
import PageLoader from '../ui/shared/PageLoader';
import { selectIsAuthenticated } from '../features/authentication/AuthSelectors';
import SubmitButton from '../ui/shared/SubmitButton';
import { useAppDispatch } from '../data/hooks';
import { fetchUser } from '../data/authSlice';
import Header from '../ui/guest/Header';

export default function CompletePhysicianProfile() {
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { showMessage } = useMessage();
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    onSuccess: async () => {
      await dispatch(fetchUser());
      showMessage({
        type: 'success',
        text: 'application submited successfuly',
      });

      navigate('/application-submitted');
    },
    onError: () => {
      showMessage({ type: 'error', text: 'application submition failed' });
    },
  });

  const handleSubmit = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;
    const values = methods.getValues();
    const formData = new FormData();
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('gender', values.gender);
    formData.append('dateOfBirth', values.dateOfBirth);

    if (values.profilePhoto) {
      formData.append('profilePhoto', values.profilePhoto);
    }
    if (values.nationalId) {
      formData.append('nationalId', values.nationalId);
    }
    if (values.resume) {
      formData.append('resume', values.resume);
    }
    if (values.medicalLicense) {
      formData.append('medicalLicense', values.medicalLicense);
    }
    if (values.specializationDoc) {
      formData.append('specializationDoc', values.specializationDoc);
    }
    if (values.degreeCertificate) {
      formData.append('degreeCertificate', values.degreeCertificate);
    }

    mutation.mutate(formData);
  };

  const stepTitles = ['Personal Info', 'Personal Docs', 'Professional Docs'];

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

  if (loading || (token && !isAuthenticated)) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen w-full gradient-teal-light flex justify-center items-center overflow-y-auto scrollbar-hide py-[50px] ">
      <Header />
      <div className="mx-4 bg-white min-h-[700px] flex justify-center w-full sm:w-[500px] md:w-[700px] rounded-2xl shadow-lg my-[50px]">
        <div className=" flex flex-col gap-2 justify-center items-center sm:py-10 h-full w-full max-w-[500px] ">
          <AuthBanner />
          <h1 className="text-4xl font-semibold text-center gradient-primary pb-3">
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
                    <span
                      className={`text-xs ${
                        isCompleted || isActive
                          ? 'text-[#000000DE] font-bold'
                          : 'text-[#00000099]'
                      } mt-3`}
                    >
                      {stepTitles[index]}
                    </span>
                  </div>
                  {step !== totalStep && (
                    <div
                      className={`border-b-[1px] w-[112px] rounded-full transition-all duration-300 ${
                        currentStep > step
                          ? 'text-primary-blues-500'
                          : 'text-[#BDBDBD] '
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="w-full text-primary-blues-500 pt-2">
            <span>step {currentStep}</span>/ <span>{3}</span>
          </div>

          {/* Form */}
          <FormProvider {...methods}>{renderForm()}</FormProvider>

          {/* Navigation */}
          <div className="w-full flex justify-between mt-[37px]">
            {currentStep > 1 && (
              <button
                className="bg-neutrals-300 px-4 py-2 text-secondary-burgandy rounded-md font-bold w-[130px] h-[44px] cursor-pointer hover:opacity-90 "
                onClick={gotoPrev}
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            {currentStep == totalStep ? (
              <div className="w-[150px]">
                <SubmitButton
                  text="COMPLETE"
                  type="button"
                  onClick={handleSubmit}
                  isPending={mutation.isPending}
                />
              </div>
            ) : (
              <PrimaryButton
                text="Next"
                onClick={goToNextStep}
                className="px-[62px] py-[8px]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
