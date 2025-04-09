import React from 'react';
import RegisterForm from '../features/authentication/components/RegisterForm';
import { Link } from 'react-router-dom';
import AuthBanner from '../features/authentication/components/AuthBanner';

export default function Register() {
  return (
    <div className="h-screen flex flex-col justify-center items-center sm:w-[400px] gap-3 m-auto">
      <AuthBanner />
      <h2 className="text-3xl font-bold text-center text-primary-teal">
        Create an Account
      </h2>
      <RegisterForm />
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
  );
}
