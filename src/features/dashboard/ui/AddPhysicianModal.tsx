import React, { useState } from 'react';
import AuthBanner from '../../authentication/components/AuthBanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FormProvider, useForm } from 'react-hook-form';
import { AddPhysicianSchema, AddPhysicianType } from '../schema';
import { zodResolver } from '@hookform/resolvers/zod';
import AddPhysicianFormOne from './AddPhysicianFormOne';
import AddPhysicianFormTwo from './AddPhysicianFormTwo';
import SubmitButton from '../../../ui/shared/SubmitButton';
import PrimaryButton from '../../../ui/shared/PrimaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPhysicianService } from '../services/dashboardService';
import { useMessage } from '../../../contexts/MessageContext';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../authentication/AuthSelectors';

export default function AddPhysicianModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const totalStep = 2;
  const [currentStep, setCurrentStep] = useState(1);
  const stepTitles = ['Physician Info', 'Physician Docs'];
  const { showMessage } = useMessage();
  const role = useSelector(selectUserRole);
  const queryClient = useQueryClient();

  const methods = useForm<AddPhysicianType>({
    resolver: zodResolver(AddPhysicianSchema),
    defaultValues: {},
    mode: 'onTouched',
  });

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <AddPhysicianFormOne />;
      case 2:
        return <AddPhysicianFormTwo />;
      default:
        return <AddPhysicianFormOne />;
    }
  };

  const gotoPrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToNextStep = async () => {
    let isStepValid = true;
    if (currentStep === 1) {
      isStepValid = await methods.trigger([
        'phoneNumber',
        'gender',
        'dateOfBirth',
        'firstName',
        'lastName',
        'specialization',
        'licenseNumber',
        'education',
        'experience',
      ]);
    }
    if (!isStepValid) return;

    if (currentStep < totalStep) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const mutation = useMutation({
    mutationFn: addPhysicianService,
    onSuccess: async (data) => {
      showMessage({
        type: 'success',
        text: data?.message || 'Physician Registerd successfuly',
      });
      queryClient.invalidateQueries({
        queryKey: ['adminPhysicians', role],
      });
      onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || 'Physician Registration Failed!';

      showMessage({
        type: 'error',
        text: errorMessage,
      });
      onClose();
    },
  });

  const handleSubmit = async () => {
    console.log('submmiting ......');
    const isValid = await methods.trigger();
    if (!isValid) return;
    console.log('submmiting 2222 ......');

    const values = methods.getValues();

    const formData = new FormData();

    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('gender', values.gender);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('specialization', values.specialization);
    formData.append('licenseNumber', values.licenseNumber);
    formData.append('education', values.education);
    formData.append('experience', String(values.experience));

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
    console.log('submmiting 33333 ......');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 overflow-y-auto p-4 "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[700px] p-[30px] max-h-[95vh] overflow-y-auto scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        <div className=" flex flex-col gap-2 justify-center items-center sm:py-10 h-full w-full max-w-[500px] mx-auto  ">
          <AuthBanner />
          <h1 className="text-4xl font-semibold text-center gradient-primary pb-3">
            Add New Physician
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
            <span>step {currentStep}</span>/ <span>{2}</span>
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
