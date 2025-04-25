import React, { useState } from 'react';
import Header from '../ui/guest/Header';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrimaryButton from '../ui/shared/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export default function ChooseAccountType() {
  const [accountType, setAccountType] = useState('physician');
  const navigate = useNavigate();
  return (
    <div className="flex flex-col pb-20">
      <div className="px-5">
        <Header />
      </div>
      <div className=" flex justify-center flex-col items-center">
        <h1 className="text-center font-bold text-[36px] leading-[100%] pt-[56px] text-[#333333] ">
          What kind of user are you?
        </h1>
        <p className="text-center pt-[10px] font-normal text-[#979797] text-[18px] w-[747px] ">
          Choose your account type to get started. Whether you're a patient
          seeking care, a provider offering services, or an institution managing
          healthcare professionals.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 pt-[68px] gap-[77px] ">
          <div
            className={`flex flex-col w-[288px]  shadow-md rounded-[6px] items-center px-3 pb-2 cursor-pointer ${
              accountType == 'physician'
                ? 'border-[1.5px] border-[#03A9F4] shadow-[#03A9F4] '
                : 'border-[1px] border-[#E5E5E5] shadow-[#E5E5E5] '
            } `}
            onClick={() => setAccountType('physician')}
          >
            <div className="flex justify-center w-[204px] pt-[26px]">
              <img
                src="./images/physician.png"
                alt="Physician"
                className="h-full"
              />
            </div>
            <h2 className="text-center font-bold text-[18px]">Physician</h2>
            <p className="text-[#666666] font-normal text-[14px] pt-[15px] text-center ">
              A licensed medical professional who diagnoses, treats, and helps
              prevent diseases and injuries in patients.
            </p>
            <div className="w-full flex justify-end pt-[11px]">
              <CheckIcon checked={accountType === 'physician'} />
            </div>
          </div>

          <div
            className={`flex flex-col w-[288px] shadow-sm rounded-[6px] items-center px-3 pb-2 cursor-pointer ${
              accountType == 'institution'
                ? 'border-[1.5px] border-[#03A9F4] shadow-[#03A9F4] '
                : 'border-[1px] border-[#E5E5E5] shadow-[#E5E5E5] '
            } `}
            onClick={() => setAccountType('institution')}
          >
            <div className="flex justify-center w-[204px] pt-[26px] ">
              <img
                src="./images/institution_image.png"
                alt="Institution"
                className="h-full"
              />
            </div>
            <h2 className="text-center font-bold text-[18px]">Institution</h2>
            <p className="text-[#666666] font-normal text-[14px] pt-[15px] text-center ">
              An organization or facility such as a hospital, clinic, or health
              center that delivers health services to patients.
            </p>
            <div className="w-full flex justify-end pt-[11px]  ">
              <CheckIcon checked={accountType === 'institution'} />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end px-4 w-[675px] pt-[87px]">
          <PrimaryButton
            text="NEXT"
            className="px-20 py-3"
            onClick={() => {
              if (accountType === 'physician') {
                navigate('/register');
              } else {
                navigate('/institution-request');
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ checked = false }: { checked?: boolean }) {
  return (
    <div
      className={`rounded-full w-[32px] h-[32px]  flex justify-center items-center text-primary-blues-500 ${
        checked ? 'bg-primary-blues-200 px-[4px]' : 'bg-gray-300 p-[6px]'
      }`}
    >
      {checked ? (
        <CheckCircleIcon sx={{ width: '100%', height: '100%' }} />
      ) : (
        <div className="w-full h-full rounded-full border-[1px] border-[#6C778B]" />
      )}
    </div>
  );
}
