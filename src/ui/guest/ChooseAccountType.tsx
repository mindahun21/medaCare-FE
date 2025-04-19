import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrimaryButton from '../shared/PrimaryButton';
import { Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ChooseAccountType({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [accountType, setAccountType] = useState('physician');
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            overflow: 'visible',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            p: 0,
          },
        },
      }}
    >
      <div className=" max-w-[800px] min-w-96 flex flex-col justify-center items-center font-bold px-6 py-10 md:p-20 w-full">
        <h1 className="text-2xl md:text-3xl pb-4 text-center">
          What kind of user are you?
        </h1>
        <p className="text-secondary-gray text-center max-w-[500px] text-sm md:text-base">
          Choose your account type to get started. Whether you're a patient
          seeking care, a provider offering services, or an institution managing
          healthcare professionals.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 py-10 max-md:max-w-96 w-full px-4">
          <div
            className="flex flex-col border-2 border-primary-teal-light shadow-lg shadow-teal-100 p-4 cursor-pointer transition hover:shadow-xl"
            onClick={() => setAccountType('physician')}
          >
            <div className="flex justify-center">
              <img
                src="./images/physician.png"
                alt="Physician"
                className="max-md:h-52"
              />
            </div>
            <h2 className="text-center text-xl md:text-2xl py-4">Physician</h2>
            <p className="text-secondary-gray text-center min-h-[5rem] text-sm md:text-base">
              A licensed medical professional who diagnoses, treats, and helps
              prevent diseases and injuries in patients.
            </p>
            <div className="flex justify-end px-6 pt-4">
              <CheckIcon checked={accountType === 'physician'} />
            </div>
          </div>

          <div
            className="flex flex-col border-2 border-primary-teal-light shadow-lg shadow-teal-100 p-4 cursor-pointer transition hover:shadow-xl"
            onClick={() => setAccountType('institution')}
          >
            <div className="flex justify-center">
              <img
                src="./images/institution_image.png"
                alt="Institution"
                className="max-md:h-52"
              />
            </div>
            <h2 className="text-center text-xl md:text-2xl py-4">
              Institution
            </h2>
            <p className="text-secondary-gray text-center min-h-[5rem] text-sm md:text-base">
              An organization or facility such as a hospital, clinic, or health
              center that delivers health services to patients.
            </p>
            <div className="flex justify-end px-6 pt-4">
              <CheckIcon checked={accountType === 'institution'} />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end w-full px-4">
          <PrimaryButton
            text="NEXT"
            className="px-8 py-4"
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
    </Dialog>
  );
}

function CheckIcon({ checked = false }: { checked?: boolean }) {
  return (
    <div
      className={`rounded-full h-10 w-10 md:h-16 md:w-16 p-2 flex justify-center items-center text-primary-teal ${
        checked ? 'bg-blue-200' : 'bg-gray-300'
      }`}
    >
      {checked ? (
        <CheckCircleIcon sx={{ width: '100%', height: '100%' }} />
      ) : (
        <div className="w-full h-full rounded-full border-2 border-gray-500" />
      )}
    </div>
  );
}
