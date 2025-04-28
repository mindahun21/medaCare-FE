import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import PrimaryButton from '../ui/shared/PrimaryButton';

export default function AccountVerified() {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#DEF1FF] to-[#DEF1FF4D] flex justify-center items-center backdrop-blur-[11px] ">
      <div className="w-[500px] gap-[25px] p-[34px]  rounded-[17px] bg-white flex flex-col items-center ">
        <div className="flex justify-center items-center bg-[#99DDC6] w-[90px] h-[90px] rounded-full ">
          <CheckIcon sx={{ color: '#037847', height: 50, width: 55 }} />
        </div>
        <h1 className="text-center text-[25px] font-semibold text-black ">
          Account Verified Successfuly
        </h1>

        <div className="flex justify-center pt-[23px]">
          <PrimaryButton
            text="Complete Profile"
            className="px-[21px] py-[15px] text-[#F5F5F5] "
            onClick={() => navigate('/profile/complete')}
          />
        </div>
      </div>
    </div>
  );
}
