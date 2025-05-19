import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../ui/shared/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export default function PatientRedirectPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#DEF1FF] to-[#DEF1FF4D] flex justify-center items-center backdrop-blur-[11px]">
      <div className="w-[500px] gap-[25px] p-[34px] rounded-[17px] bg-white flex flex-col items-center">
        <div className="flex justify-center items-center bg-[#FFCCCB] w-[90px] h-[90px] rounded-full">
          <CloseIcon sx={{ color: '#D32F2F', height: 50, width: 55 }} />
        </div>
        <h1 className="text-center text-[25px] font-semibold text-black">
          Patient Login Not Supported
        </h1>
        <p className="text-center font-inter font-normal text-[16px] text-[#667085]">
          Patient access is only available through our mobile app. Please use
          the mobile application to log in and manage your account.
        </p>
        <div className="flex justify-center pt-[23px]">
          <PrimaryButton
            text="Go back to landing page"
            className="px-[21px] py-[15px] text-[#F5F5F5]"
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
}
