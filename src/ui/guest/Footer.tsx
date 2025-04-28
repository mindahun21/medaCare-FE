import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-primary-teal-surface py-[57px] px-20 2xl:px-105 flex flex-col">
      <div className="flex justify-between w-full pb-[58px] border-b-2 border-b-primary-blues-200">
        <div className="flex flex-col justify-between ">
          <div className="w-[142px]">
            <img src="/images/logo.png" />
          </div>
          <div className="">
            <p className="font-medium text-[16px] leading-[25px] w-[284px] text-neutrals-500">
              Experience personalized medical care from the comfort of your
              home.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <span className="text-primary-blues-500 font-bold text-[17px] leading-[25px] ">
            Support
          </span>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Getting Started
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            FAQS
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Help Articles
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Report an issue
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Contact Help Desk
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <span className="text-primary-blues-500 font-bold text-[17px] leading-[25px] ">
            Services
          </span>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Booking appointments{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Online consultations{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Prescriptions{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Medicine Refills{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Medical Notes{' '}
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <span className="text-primary-blues-500 font-bold text-[17px] leading-[25px] ">
            Legal
          </span>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Terms & Conditions{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Privacy Policy
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Cookie Notice{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Cookie Preferences{' '}
          </Link>
          <Link
            to={'#'}
            className="font-medium text-[17px] leading-[25px] text-neutrals-500"
          >
            Trust Center{' '}
          </Link>
        </div>
      </div>
      <div className="flex justify-between pt-[25px]">
        <div className="flex gap-[12px] items-center">
          <span className="w-[33px] ">
            <img
              className="h-full w-full"
              src="/icons/ic_baseline-facebook.png"
              alt="facebook icon"
            />
          </span>
          <span className="w-[33px] ">
            <img
              className="h-full w-full"
              src="/icons/mdi_instagram.png"
              alt="facebook icon"
            />
          </span>{' '}
          <span className="w-[33px] ">
            <img
              className="h-full w-full"
              src="/icons/mdi_linkedin.png"
              alt="facebook icon"
            />
          </span>
          <span className="w-[33px] ">
            <img
              className="h-full w-full"
              src="/icons/mdi_youtube.png"
              alt="facebook icon"
            />
          </span>
        </div>
        <p className="text-neutrals-300 font-semibold text-[16px] leading-[25px] ">
          MedaCare 2024 © All Rights Reserved
        </p>
      </div>
    </div>
  );
}
