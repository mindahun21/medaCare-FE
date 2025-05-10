import { useState } from 'react';
import { CircularProgress, Tooltip as MuiTooltip } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Link } from 'react-router-dom';
import InstitutionTable from '../ui/InstitutionTable';
import {
  useAdminPhysicians,
  useAppointments,
  useInstitutions,
} from '../hooks/dashboardHooks';
import Role from '../../../ui/shared/Role';
import PhysicianTable from '../ui/PhysicianTable';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../authentication/AuthSelectors';
import AppointmentsTable from '../ui/AppointmentsTable';

export default function Dashboard() {
  const role = useSelector(selectUserRole);
  const [metric, setMetric] = useState('Metric');
  const [timeframe, setTimeframe] = useState('Today');
  const {
    data: institutions,
    isLoading: institutionLoading,
    isError: institutionError,
  } = useInstitutions();
  const recentInstitutions = institutions?.slice(0, 5);
  const {
    data: physicians,
    isLoading: physicianLoading,
    isError: physicianError,
  } = useAdminPhysicians();
  const recentPhysicians = physicians?.slice(0, 5);
  const {
    data: appointments,
    isLoading: appointmentsLoading,
    isError: appointmentError,
  } = useAppointments();
  const recentAppointments = appointments?.slice(0, 5);

  const pieChartData = [
    { label: 'Female', value: 2000, color: 'bg-blue-500' },
    { label: 'Male', value: 500, color: 'bg-blue-300' },
    { label: 'Child', value: 1000, color: 'bg-blue-100' },
  ];

  const barGraphData = [
    { day: 'Sun', oldPatients: 300, newPatients: 90 },
    { day: 'Mon', oldPatients: 100, newPatients: 400 },
    { day: 'Tue', oldPatients: 333, newPatients: 25 },
    { day: 'Wed', oldPatients: 67, newPatients: 200 },
    { day: 'Thu', oldPatients: 40, newPatients: 35 },
    { day: 'Fri', oldPatients: 690, newPatients: 45 },
    { day: 'Sat', oldPatients: 35, newPatients: 300 },
  ];

  return (
    <div className="min-h-[calc(100vh-65px)]  py-[23px] px-[50px] flex flex-col font-inter">
      <div className="flex">
        <div className="flex flex-col w-3/4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 ">
              <h1 className="font-bold text-[34px] leading-[100%] ">
                Hello{' '}
                {role == 'ADMIN' ? (
                  <span>Admin</span>
                ) : role == 'INSTITUTION' ? (
                  <span>Institution</span>
                ) : (
                  <span>Physician</span>
                )}
                👋🏻
              </h1>
              <p className="text-[20px] leading-[100%] text-[#85878D] ">
                Let's learn something new today!
              </p>
            </div>
          </div>
          <div className="mt-[20px] flex justify-start gap-[25px]">
            {[
              { count: '7,251', label: 'Registered Physicians' },
              { count: '65', label: 'Pending Approval' },
              { count: '5', label: 'Appointments Booked' },
              { count: '65', label: 'Treated Patients' },
            ].map((item, index) => (
              <div
                key={index}
                className="min-w-[202px] flex-1 h-[112px] rounded-[16px] p-[24px] bg-gradient-to-b from-[#1D586E] to-[#38AAD4] flex flex-col items-end justify-center"
              >
                <div className="flex justify-between w-full items-center">
                  <img
                    src="/images/patient_bed.png"
                    alt=""
                    className="h-[35px] w-[35px] 2xl:h-[45px] 2xl:w-[45px] rounded-full"
                  />
                  <p className="text-white text-[24px] 2xl:text-[30px] font-semibold">
                    {item.count}
                  </p>
                </div>
                <p className="text-[14px] 2xl:text-[20px] leading-[20px] text-white pt-2">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 w-full mt-[30px] ">
            {/* Pie Chart */}
            <div className="w-[400px] h-[320px] bg-gradient-to-r from-[#03A9F4] to-[#38AAD499] p-[2px] rounded-lg ">
              <div className=" bg-white rounded-lg p-4 w-full h-full">
                <div className="flex flex-col justify-start items-start mb-4">
                  <h2 className="font-semibold text-[16px] leading-[20px] ">
                    Patients By Gender
                  </h2>
                  <div className="flex gap-2 pt-[10px] ">
                    <select
                      className="border border-[#E1E7EC] rounded-[4px] text-sm text-[#2A2E33] px-[11px] py-[7px] focus:border-[#E1E7EC] "
                      value={metric}
                      onChange={(e) => setMetric(e.target.value)}
                    >
                      <option className="text-[#E1E7EC">Metric</option>
                      <option>Another Metric</option>
                    </select>
                    <select
                      className="border border-[#E1E7EC] rounded-[4px] text-sm text-[#2A2E33] px-[11px] py-[7px] focus:border-[#E1E7EC] "
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className="w-[167px] h-[167px] recharts-pie-sector"
                    style={{ outline: 'none' }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <RechartsTooltip
                          formatter={(value, name) => [
                            `${value} Patients`,
                            name,
                          ]}
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                          }}
                        />
                        <Pie
                          data={pieChartData}
                          dataKey="value"
                          nameKey="label"
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          innerRadius={45}
                          labelLine={false}
                          isAnimationActive={false}
                          activeShape={false}
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                entry.color === 'bg-blue-500'
                                  ? '#3b82f6'
                                  : entry.color === 'bg-blue-300'
                                  ? '#60a5fa'
                                  : '#bfdbfe'
                              }
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="ml-8 space-y-2 text-sm">
                    {pieChartData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                        ></div>
                        <MuiTooltip title={`${item.value} Patients`} arrow>
                          <span>{item.label}</span>
                        </MuiTooltip>
                        <span className="ml-auto font-semibold">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bar Graph */}
            <div className="flex-1 bg-gradient-to-r from-[#03A9F4] to-[#38AAD499] p-[2px] rounded-lg ">
              <div className=" bg-white rounded-lg p-4 w-full h-full">
                <div className="flex flex-col justify-start items-start mb-4">
                  <h2 className="font-semibold text-[16px] leading-[20px] ">
                    Patients By Gender
                  </h2>
                  <div className="flex gap-2 pt-[10px] ">
                    <select
                      className="border border-[#E1E7EC] rounded-[4px] text-sm text-[#2A2E33] px-[11px] py-[7px] focus:border-[#E1E7EC] "
                      value={metric}
                      onChange={(e) => setMetric(e.target.value)}
                    >
                      <option className="text-[#E1E7EC">Metric</option>
                      <option>Another Metric</option>
                    </select>
                    <select
                      className="border border-[#E1E7EC] rounded-[4px] text-sm text-[#2A2E33] px-[11px] py-[7px] focus:border-[#E1E7EC] "
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                    >
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                </div>

                <div className="h-[200px] w-full relative bg-white flex items-end justify-between px-2 text-xs text-gray-500">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={barGraphData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="oldPatients"
                        stroke="#3b82f6"
                        name="Old Patients"
                      />
                      <Line
                        type="monotone"
                        dataKey="newPatients"
                        stroke="#86efac"
                        name="First Time Patients"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* notification section */}
        <div></div>
      </div>
      <div className="flex flex-col mb-32">
        <div className="flex justify-between items-center my-[40px]">
          <p className="font-bold text-[24px] leading-[100%] ">
            Recent{' '}
            {role == 'ADMIN' ? (
              <span> Intitutions</span>
            ) : role == 'ORG_ADMIN' ? (
              <span>Physicians</span>
            ) : (
              <span>Apointments</span>
            )}
          </p>
          <Link
            to={`${
              role == 'ADMIN'
                ? '/home/institutions'
                : role == 'ORG_ADMIN'
                ? '/home/physicians'
                : '/home/appointments'
            }`}
            className="text-primary-blues-500 text-[12px] leading-[17px] "
          >
            View More
          </Link>
        </div>
        <Role allowedRoles={['ADMIN']} fallback={null}>
          <>
            <InstitutionTable data={recentInstitutions ?? []} />
            {(institutions?.length === 0 || institutionError) && (
              <p className="text-center text-xl mt-4 text-gray-500">
                No institutions found.
              </p>
            )}
            {institutionLoading && (
              <div className="flex my-20 justify-center text-primary-blues-200">
                <CircularProgress />
              </div>
            )}
          </>
        </Role>
        <Role allowedRoles={['ORG_ADMIN']} fallback={null}>
          <>
            <PhysicianTable data={recentPhysicians ?? []} />
            {(physicians?.length === 0 || physicianError) && (
              <p className="text-center text-xl mt-4 text-gray-500">
                No institutions found.
              </p>
            )}
            {physicianLoading && (
              <div className="flex my-20 justify-center text-primary-blues-200">
                <CircularProgress />
              </div>
            )}
          </>
        </Role>

        <Role allowedRoles={['PHYSICIAN']} fallback={null}>
          <>
            <AppointmentsTable data={recentAppointments ?? []} />
            {(appointments?.length === 0 || appointmentError) && (
              <p className="text-center text-xl mt-4 text-gray-500">
                No institutions found.
              </p>
            )}
            {appointmentsLoading && (
              <div className="flex my-20 justify-center text-primary-blues-200">
                <CircularProgress />
              </div>
            )}
          </>
        </Role>
      </div>
    </div>
  );
}
