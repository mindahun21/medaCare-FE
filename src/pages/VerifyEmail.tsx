import React from 'react';
import VerifyEmailForm from '../features/authentication/components/VerifyEmailForm';

export default function VerifyEmail() {
  return (
    <div className="h-screen flex flex-col justify-center items-center sm:w-[400px] gap-6 m-auto ">
      <VerifyEmailForm />
    </div>
  );
}
