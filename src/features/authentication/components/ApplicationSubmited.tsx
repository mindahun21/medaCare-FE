import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import PrimaryButton from '../../../ui/shared/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export default function ApplicationSubmited() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#DEF1FF] to-[#DEF1FF4D] flex justify-center items-center backdrop-blur-[11px] ">
      <div className="w-[500px] gap-[25px] p-[34px]  rounded-[17px] bg-white flex flex-col items-center ">
        <div className="flex justify-center items-center bg-[#99DDC6] w-[90px] h-[90px] rounded-full ">
          <CheckIcon sx={{ color: '#037847', height: 50, width: 55 }} />
        </div>
        <h1 className="text-center text-[25px] font-semibold text-black ">
          Application Submitted Successfuly
        </h1>
        <p className="text-center font-inter font-normal text-[16px] text-[#667085] ">
          your application is being processed.we'll let you know after review
          after it's verfied
        </p>
        <div className="flex justify-center pt-[23px]">
          <PrimaryButton
            text="Go back to landing page"
            className="px-[21px] py-[15px] text-[#F5F5F5] "
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </div>
  );
}
