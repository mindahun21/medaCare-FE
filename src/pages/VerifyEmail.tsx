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
    onSuccess: () => {
      console.log('resending email  successFull');
    },
    onError: () => {
      console.log('resending email  unsuccessFull');
    },
  });

  const handleResendEmail = () => {
    if (email) {
      mutation.mutate({ email: email });
    }
  };
  return (
    <div className="flex justify-center h-screen ">
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="./images/login_image.png"
          className="w-full h-full object-cover rounded-l-2xl"
          alt=""
        />
      </div>
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
  );
}
