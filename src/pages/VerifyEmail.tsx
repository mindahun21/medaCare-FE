import React from 'react';
import VerifyEmailForm from '../features/authentication/components/VerifyEmailForm';
import AuthBanner from '../features/authentication/components/AuthBanner';
import TextButton from '../ui/shared/TextButton';
import { useMutation } from '@tanstack/react-query';
import { resendEmail } from '../features/authentication/services/authApi';
import { useAppSelector } from '../data/hooks';

export default function VerifyEmail() {
  const email = useAppSelector((state) => state.auth.email);

  const mutation = useMutation({
    mutationFn: resendEmail,
    onSuccess: () => {},
    onError: () => {},
  });

  const handleResendEmail = () => {
    if (email) {
      mutation.mutate({ email: email });
    }
  };
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#DEF1FF] to-[#DEF1FF4D] flex justify-center items-center backdrop-blur-[11px] ">
      <div className="w-[500px] gap-[25px] p-[34px]  rounded-[17px] bg-white flex flex-col items-center ">
        <div className="flex w-[968px] rounded-[30px]">
          <div className="flex flex-col justify-center items-center min-w-96 sm:w-[400px] gap-3 m-auto px-4">
            <AuthBanner />
            <VerifyEmailForm />
            <div className="mt-5">
              <p className="text-primary-teal text-2xl">
                Didn&#x27;t receive the email?
                <TextButton text="Send again" onClick={handleResendEmail} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
