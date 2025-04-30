import React from 'react';
import VerifyEmailForm from '../features/authentication/components/VerifyEmailForm';
import AuthBanner from '../features/authentication/components/AuthBanner';
import TextButton from '../ui/shared/TextButton';
import { useMutation } from '@tanstack/react-query';
import { resendEmail } from '../features/authentication/services/authApi';
import { useAppSelector } from '../data/hooks';
import { useMessage } from '../contexts/MessageContext';

export default function VerifyEmail() {
  const email = useAppSelector((state) => state.auth.email);
  const { showMessage } = useMessage();

  const mutation = useMutation({
    mutationFn: resendEmail,
    onSuccess: () => {
      showMessage({
        type: 'success',
        text: 'A verification email has been sent to your email address. Please check your inbox.',
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        'Failed to resend the verification email. Please try again later.';
      showMessage({
        type: 'error',
        text: errorMessage,
      });
    },
  });

  const handleResendEmail = () => {
    if (email) {
      mutation.mutate({ email: email });
    }
  };
  return (
    <div className="min-h-screen py-10 w-full bg-gradient-to-b from-[#DEF1FF] to-[#DEF1FF4D] flex justify-center items-center backdrop-blur-[11px] ">
      <div className="w-[500px] gap-[25px] p-[34px]  rounded-[17px] bg-white flex flex-col items-center ">
        <div className="flex w-[968px] rounded-[30px]">
          <div className="flex flex-col justify-center items-center min-w-96 sm:w-[400px] gap-3 m-auto px-4">
            <AuthBanner />
            <VerifyEmailForm />
            <div className="mt-5">
              <p className="text-primary-teal">
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
