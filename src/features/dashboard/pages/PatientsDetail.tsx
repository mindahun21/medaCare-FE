import { Link, useParams } from 'react-router-dom';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { useAdminPatients } from '../hooks/dashboardHooks';
import PageLoader from '../../../ui/shared/PageLoader';

export default function PatientsDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: patients, isLoading } = useAdminPatients();
  const patient = patients?.find((p) => p.id === Number(id));

  if (!patient) {
    return (
      <div className="flex justify-center my-10 text-4xl ">
        <h1>Patient Not Found</h1>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoader />;
  }

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
            <Link to={'/home/patients'} className="hover:underline">
              Patients
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
      <div className="mt-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className="p-6 flex flex-col gap-8 rounded-[18px] bg-[#ffffff]">
          <h1 className="text-primary-teal text-2xl font-semibold leading-[150%]">
            Basic Info
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-8">
            {/* Row 1 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Emergency Contact Name:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.emergencyContactName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[220px] text-primary-teal text-[18px] ">
                Language:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.preferredLanguage}
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <LocalPhoneOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Emergency Contact Phone:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.emergencyContactNumber}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[220px] text-primary-teal text-[18px] ">
                Marital Status:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.maritalStatus}
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Occupation:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.occupation}
              </span>
            </div>

            {/* Row 4 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[220px] text-primary-teal text-[18px] ">
                City/District:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.address}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[46px] bg-gradient-to-br from-[#2CA6FF] to-[#FFFFFF] p-[1px] rounded-[20px] shadow-[0px_5px_20px_5px_#0000000F]">
        <div className="p-6 flex flex-col gap-8 rounded-[18px] bg-[#ffffff]">
          <h1 className="text-primary-teal text-2xl font-semibold leading-[150%]">
            Basic Info
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-8">
            {/* Row 1 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Blood Type:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.bloodType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[220px] text-primary-teal text-[18px] ">
                Medical History:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.medicalHistory}
              </span>
            </div>

            {/* Row 2 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <LocalPhoneOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Height:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.heightInMeters} Meters
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[220px] text-primary-teal text-[18px] ">
                Medications:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.medications}
              </span>
            </div>

            {/* Row 3 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Weight:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.weightInKg} Kg
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[220px] text-primary-teal text-[18px] ">
                Past Diagnosis:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.pastDiagnosis}
              </span>
            </div>

            {/* Row 4 */}
            <div className="flex items-center gap-2">
              <span className="text-secondary-burgandy">
                <PersonOutlineOutlinedIcon className="mt-1  " />
              </span>
              <span className=" w-[240px] text-primary-teal text-[18px] ">
                Allergies:
              </span>
              <span className="font-bold text-primary-teal">
                {patient.allergies}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
