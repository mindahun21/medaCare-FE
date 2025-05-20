import React, { useState } from 'react';
import { useAppointments } from '../hooks/dashboardHooks';
import { Link, useParams } from 'react-router-dom';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PageLoader from '../../../ui/shared/PageLoader';
export default function PatientAppointmentDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: appointments, isLoading, isError } = useAppointments();
  const appointment = appointments?.find((apoint) => apoint.id == Number(id));
  const patient = appointment?.patient;

  const [tab, setTab] = useState('overview');
  // const formatDate = (dateStr: string) => {
  //   const date = new Date(dateStr);
  //   return date.toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'short',
  //     day: 'numeric',
  //   });
  // };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return null;
  }
  if (!patient) return null;

  return (
    <div className="p-[34px] flex flex-col min-h-[calc(100vh-65px)] ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="font-semibold text-[32px] leading-[100%] gradient-primary ">
            Patient Details
          </h1>
          <div className="flex gap-2 font-medium text-[12px] text-primary-teal pt-[10px] ">
            <Link to={'/home/dashboard'} className="hover:underline">
              Home
            </Link>
            <span>&gt;</span>
            <Link to={'/home/appointments'} className="hover:underline">
              Appointments
            </Link>
            <span>&gt;</span>
            <span className="text-[#1D586E99]">Patients Details</span>
          </div>
        </div>
      </div>
      <div className="mt-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className="p-[21px] flex justify-between items-end rounded-[18px] bg-[#DEF1FF]  ">
          <div className="flex flex-col">
            <h1 className="text-primary-teal font-inter font-semibold text-[28px] leading-[150%] mt-[11px]">
              {patient.user.firstName + ' ' + patient.user.lastName}
            </h1>
            <div className="flex gap-5 text-[#727272] text-[18px]">
              {patient.dateOfBirth && (
                <span>
                  {new Date().getFullYear() -
                    new Date(patient.dateOfBirth).getFullYear()}{' '}
                  years old
                </span>
              )}
              <span>
                {patient.gender.charAt(0).toUpperCase() +
                  patient.gender.slice(1).toLowerCase()}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-end gap-[32px] pe-20 pb-5 h-full">
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <LocalPhoneOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {patient.contactNumber}
              </p>
            </div>
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <EmailOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {patient.user.email}
              </p>
            </div>
            <div className="flex justify-start gap-4 text-[#2CA6FF] ">
              <LocationOnOutlinedIcon />
              <p className="text-[#727272] text-[18px] leading-[150%] ">
                {patient.address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[70] w-[390px] bg-[#DEF1FF45] rounded-2xl flex gap-4 p-2 text-primary-teal text-[18px] mt-[30px] ">
        <button
          className={`w-[200px] text-center ${
            tab == 'overview'
              ? 'bg-white h-full border border-[#2CA6FF] rounded-[10px] '
              : 'font-extrabold'
          } `}
          onClick={() => {
            if (tab != 'overview') {
              setTab('overview');
            }
          }}
        >
          Overview
        </button>
        {/* <button
          className={`w-[200px] text-center ${
            tab == 'appointment'
              ? 'bg-white h-full border border-[#2CA6FF] rounded-[10px] py-1 '
              : 'font-extrabold'
          } `}
          onClick={() => {
            if (tab != 'appointment') {
              setTab('appointment');
            }
          }}
        >
          Appointment
        </button> */}
      </div>
      <div className="mt-[45] grid grid-cols-2 gap-6 ">
        <div className="mt-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
          <div className="p-6 flex flex-col gap-8 rounded-[18px] bg-[#ffffff]">
            <h1 className="text-primary-teal text-2xl font-semibold leading-[150%]">
              Past Diagnosis
            </h1>
            <p className=" text-[18px] text-[#727272] ">
              {patient.pastDiagnosis}
            </p>
          </div>
        </div>
        <div className="mt-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
          <div className="p-6 flex flex-col gap-8 rounded-[18px] bg-[#ffffff]">
            <h1 className="text-primary-teal text-2xl font-semibold leading-[150%]">
              Allergies
            </h1>
            <p className=" text-[18px] text-[#727272] ">{patient.allergies}</p>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
          <div className="p-6 flex flex-col gap-8 rounded-[18px] bg-[#ffffff]">
            <h1 className="text-primary-teal text-2xl font-semibold leading-[150%]">
              Basic Info
            </h1>
            <div className="flex flex-wrap  ">
              <div className=" flex flex-col w-1/2 items-start justify-start gap-1 pb-4 ">
                <p className="font-bold">Blood Type</p>{' '}
                <span className="text-[#727272]">{patient.bloodType}</span>
              </div>
              <div className=" flex flex-col w-1/2 items-start justify-start gap-1 pb-4 ">
                <p className="font-bold">Height</p>{' '}
                <span className="text-[#727272]">
                  {patient.heightInMeters} Meters
                </span>
              </div>
              <div className=" flex flex-col w-1/2 items-start justify-start gap-1 pb-4 ">
                <p className="font-bold">Weight</p>{' '}
                <span className="text-[#727272]">{patient.weightInKg} Kg</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
          <div className="p-6 flex flex-col gap-8 rounded-[18px] bg-[#ffffff] h-full ">
            <h1 className="text-primary-teal text-2xl font-semibold leading-[150%]">
              Medications
            </h1>
            <p className=" text-[18px] text-[#727272] ">
              {patient.medications}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
