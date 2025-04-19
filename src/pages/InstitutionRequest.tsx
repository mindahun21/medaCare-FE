import React from 'react';
import AuthBanner from '../features/authentication/components/AuthBanner';
import InstitutionRequestForm from '../features/authentication/components/InstitutionRequestForm';
import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';

export default function InstitutionRequest() {
  return (
    <div className="flex justify-center h-screen ">
      <div className="hidden md:flex w-1/2 h-full ">
        <img
          src="./images/login_image.png"
          className="w-full h-full object-cover rounded-l-2xl"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-center sm:w-[400px] gap-3 m-auto px-4">
        <AuthBanner />
        <h2 className="text-3xl font-bold text-center text-primary-teal">
          Request Account
        </h2>
        <InstitutionRequestForm />
        <div className="w-full">
          <Divider
            sx={{
              width: '100%',
              color: 'var(--color-secondary-gray)',
              fontWeight: 'medium',
            }}
          >
            Or
          </Divider>
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
