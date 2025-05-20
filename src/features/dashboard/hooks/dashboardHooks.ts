// import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchAdminPatients,
  fetchAdminPhysicians,
  fetchAppointments,
  fetchAvailability,
  fetchInstitutions,
} from '../services/dashboardService';
import {
  Appointment,
  Institution,
  Patient,
  Physician,
  WorkingHour,
} from '../types';
import apiClient from '../../../services/apiClient';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../authentication/AuthSelectors';

export const useAdminPhysicians = (enabled = true) => {
  const role = useSelector(selectUserRole) || '';
  return useQuery<Physician[], Error>({
    queryKey: ['adminPhysicians', role],
    queryFn: () => fetchAdminPhysicians(role),
    enabled: enabled,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useInstitutions = (enabled = true) => {
  return useQuery<Institution[], Error>({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
    enabled: enabled,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useWorkingHours = (enabled = true) => {
  return useQuery<WorkingHour[], Error>({
    queryKey: ['workingHours'],
    queryFn: fetchAvailability,
    enabled: enabled,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useAppointments = (enabled = true) => {
  return useQuery<Appointment[], Error>({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    enabled: enabled,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useAdminPatients = (enabled = true) => {
  return useQuery<Patient[], Error>({
    queryKey: ['adminPatients'],
    queryFn: fetchAdminPatients,
    enabled: enabled,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useAdminReports = (enabled = true) => {
  return useQuery({
    queryKey: ['adminReports'],
    queryFn: async () => {
      const response = await apiClient.get('reports/admin/dashboard');
      return response.data.data;
      console.log(response.data);
    },
    enabled: enabled,
  });
};

// export const useMockUser = (): Patient => {
//   return useMemo(
//     () => ({
//       id: 1,
//       dateOfBirth: '1990-04-15',
//       age: 35,
//       address: '456 Maple Avenue, Addis Ababa, Ethiopia',
//       contactNumber: '+251911223344',
//       emergencyContactName: 'Sara Mekonnen',
//       emergencyContactNumber: '+251922334455',
//       medicalHistory: 'Diagnosed with asthma in 2012. Managed with inhalers.',
//       pastDiagnosis: 'Asthma',
//       bloodType: 'A+',
//       allergies: 'Peanuts',
//       medications: 'Salbutamol inhaler as needed',
//       preferredLanguage: 'Amharic',
//       occupation: 'Accountant',
//       maritalStatus: 'Married',
//       heightInMeters: 1.68,
//       weightInKg: 68.5,
//       gender: 'Female',
//       specializationPreference: ['Pulmonology', 'General Practitioner'],
//       appointments: [
//         {
//           id: 101,
//           status: 'SCHEDULED',
//           createdOn: '2025-05-01',
//           consultationType: 'Virtual',
//           meetingDetails: 'Follow-up on asthma control',
//           meetingLink: 'https://example.com/meet/101',
//           appointmentStartTime: '10:00',
//           appointmentEndTime: '10:30',
//           appointmentDateTz: '2025-05-10T10:00:00+03:00',
//           appointmentDate: '2025-05-10',
//         },
//         {
//           id: 102,
//           status: 'SCHEDULED',
//           createdOn: '2025-05-01',
//           consultationType: 'Virtual',
//           meetingDetails: 'Follow-up on asthma control',
//           meetingLink: 'https://example.com/meet/101',
//           appointmentStartTime: '10:00',
//           appointmentEndTime: '10:30',
//           appointmentDateTz: '2025-05-10T10:00:00+03:00',
//           appointmentDate: '2025-05-10',
//         },
//         {
//           id: 103,
//           status: 'SCHEDULED',
//           createdOn: '2025-05-01',
//           consultationType: 'Virtual',
//           meetingDetails: 'Follow-up on asthma control',
//           meetingLink: 'https://example.com/meet/101',
//           appointmentStartTime: '10:00',
//           appointmentEndTime: '10:30',
//           appointmentDateTz: '2025-05-10T10:00:00+03:00',
//           appointmentDate: '2025-05-10',
//         },
//       ],
//       createdAt: '2025-04-01T08:00:00Z',
//       updatedAt: '2025-05-01T08:00:00Z',
//       user: {
//         id: 1,
//         firstName: 'Liya',
//         lastName: 'Tadesse',
//         email: 'liya.t@example.com',
//         passwordResetRequired: false,
//         firstLogin: false,
//         verified: true,
//         entity: null,
//         origin: 'SELF_REGISTERED',
//         role: {
//           id: 4,
//           name: 'PATIENT',
//           description: 'Patient role',
//           createdAt: '2025-03-15T12:00:00Z',
//           updatedAt: '2025-03-15T12:00:00Z',
//         },
//         roleName: 'PATIENT',
//         createdAt: '2025-04-01T08:00:00Z',
//         createdOn: '2025-04-01',
//         updatedAt: '2025-05-01T08:00:00Z',
//         updatedOn: '2025-05-01',
//         photoLink: null,
//         enabled: true,
//         authorities: [
//           {
//             authority: 'ROLE_PATIENT',
//           },
//         ],
//       },
//       medicalRecord: [
//         {
//           diagnosis: 'Asthma',
//           prescription: 'Salbutamol inhaler',
//           notes: 'Recommended regular follow-ups every 3 months.',
//           createdAt: '2025-03-01T12:00:00Z',
//           createdOn: '2025-03-01',
//           updatedAt: '2025-03-01T12:00:00Z',
//           updatedOn: '2025-03-01',
//         },
//       ],
//       bmi: 24.3,
//     }),
//     []
//   );
// };
