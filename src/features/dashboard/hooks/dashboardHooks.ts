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
import { useMemo } from 'react';

export const useAdminPhysicians = () => {
  return useQuery<Physician[], Error>({
    queryKey: ['adminPhysicians'],
    queryFn: fetchAdminPhysicians,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useInstitutions = () => {
  return useQuery<Institution[], Error>({
    queryKey: ['institutions'],
    queryFn: fetchInstitutions,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useWorkingHours = () => {
  return useQuery<WorkingHour[], Error>({
    queryKey: ['workingHours'],
    queryFn: fetchAvailability,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useAppointments = () => {
  return useQuery<Appointment[], Error>({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useAdminPatients = () => {
  return useQuery<Patient[], Error>({
    queryKey: ['adminPatients'],
    queryFn: fetchAdminPatients,
    staleTime: 60 * 60 * 1000,
    retry: 3,
  });
};

export const useMockUser = (): Patient => {
  return useMemo(
    () => ({
      id: 1,
      dateOfBirth: '1990-04-15',
      age: 35,
      address: '456 Maple Avenue, Addis Ababa, Ethiopia',
      contactNumber: '+251911223344',
      emergencyContactName: 'Sara Mekonnen',
      emergencyContactNumber: '+251922334455',
      medicalHistory: 'Diagnosed with asthma in 2012. Managed with inhalers.',
      pastDiagnosis: 'Asthma',
      bloodType: 'A+',
      allergies: 'Peanuts',
      medications: 'Salbutamol inhaler as needed',
      preferredLanguage: 'Amharic',
      occupation: 'Accountant',
      maritalStatus: 'Married',
      heightInMeters: 1.68,
      weightInKg: 68.5,
      gender: 'Female',
      specializationPreference: ['Pulmonology', 'General Practitioner'],
      appointments: [
        {
          id: 101,
          createdOn: '2025-05-01',
          consultationType: 'Virtual',
          meetingDetails: 'Follow-up on asthma control',
          meetingLink: 'https://example.com/meet/101',
          appointmentStartTime: '10:00',
          appointmentEndTime: '10:30',
          appointmentDateTz: '2025-05-10T10:00:00+03:00',
          appointmentDate: '2025-05-10',
        },
        {
          id: 102,
          createdOn: '2025-05-01',
          consultationType: 'Virtual',
          meetingDetails: 'Follow-up on asthma control',
          meetingLink: 'https://example.com/meet/101',
          appointmentStartTime: '10:00',
          appointmentEndTime: '10:30',
          appointmentDateTz: '2025-05-10T10:00:00+03:00',
          appointmentDate: '2025-05-10',
        },
        {
          id: 103,
          createdOn: '2025-05-01',
          consultationType: 'Virtual',
          meetingDetails: 'Follow-up on asthma control',
          meetingLink: 'https://example.com/meet/101',
          appointmentStartTime: '10:00',
          appointmentEndTime: '10:30',
          appointmentDateTz: '2025-05-10T10:00:00+03:00',
          appointmentDate: '2025-05-10',
        },
      ],
      createdAt: '2025-04-01T08:00:00Z',
      updatedAt: '2025-05-01T08:00:00Z',
      user: {
        id: 1,
        firstName: 'Liya',
        lastName: 'Tadesse',
        email: 'liya.t@example.com',
        passwordResetRequired: false,
        firstLogin: false,
        verified: true,
        entity: null,
        origin: 'SELF_REGISTERED',
        role: {
          id: 4,
          name: 'PATIENT',
          description: 'Patient role',
          createdAt: '2025-03-15T12:00:00Z',
          updatedAt: '2025-03-15T12:00:00Z',
        },
        roleName: 'PATIENT',
        createdAt: '2025-04-01T08:00:00Z',
        createdOn: '2025-04-01',
        updatedAt: '2025-05-01T08:00:00Z',
        updatedOn: '2025-05-01',
        photoLink: null,
        enabled: true,
        authorities: [
          {
            authority: 'ROLE_PATIENT',
          },
        ],
      },
      medicalRecord: [
        {
          diagnosis: 'Asthma',
          prescription: 'Salbutamol inhaler',
          notes: 'Recommended regular follow-ups every 3 months.',
          createdAt: '2025-03-01T12:00:00Z',
          createdOn: '2025-03-01',
          updatedAt: '2025-03-01T12:00:00Z',
          updatedOn: '2025-03-01',
        },
      ],
      bmi: 24.3,
    }),
    []
  );
};
