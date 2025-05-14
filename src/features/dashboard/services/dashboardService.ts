import apiClient from '../../../services/apiClient';
import { Institution, Physician } from '../types';
import { z } from 'zod';

export const payloadSchema = z
  .object({
    documentInvalid: z.boolean(),
    licenseNotValid: z.boolean(),
    identityUnverified: z.boolean(),
    professionallyQualified: z.boolean(),
    rejectionReasonNote: z.string(),
  })
  .refine(
    (data) =>
      data.documentInvalid ||
      data.licenseNotValid ||
      data.identityUnverified ||
      data.professionallyQualified,
    {
      message: 'At least one reason must be selected.',
      path: ['documentInvalid'],
    }
  );

export type Payload = z.infer<typeof payloadSchema>;
export const timeSlotSchema = z
  .object({
    date: z
      .string()
      .min(1, { message: 'Date is required' })
      .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
        message: 'Invalid date format (expected YYYY-MM-DD)',
      })
      .refine(
        (val) => {
          const inputDate = new Date(val);
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return inputDate >= new Date(tomorrow.toDateString());
        },
        {
          message: 'Date must be from tomorrow onward',
        }
      ),
    startTime: z
      .string()
      .min(1, { message: 'Start time is required' })
      .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(val), {
        message: 'Invalid start time format (expected HH:mm or HH:mm:ss)',
      }),

    endTime: z
      .string()
      .min(1, { message: 'End time is required' })
      .refine((val) => /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(val), {
        message: 'Invalid end time format (expected HH:mm or HH:mm:ss)',
      }),
  })
  .refine(
    (data) => {
      const toSeconds = (t: string) => {
        const [h, m, s = '00'] = t.split(':');
        return +h * 3600 + +m * 60 + +s;
      };

      if (!data.startTime || !data.endTime) return true;

      return toSeconds(data.endTime) - toSeconds(data.startTime) >= 1800;
    },
    {
      message: 'End time must be at least 30 minutes after start time',
      path: ['endTime'],
    }
  );
export type TimeSlot = z.infer<typeof timeSlotSchema>;

export const fetchAdminPhysicians = async (
  role: string
): Promise<Physician[]> => {
  try {
    const endpoint =
      role === 'ADMIN' ? 'physicians/all' : 'institutions/physicians';
    const response = await apiClient.get(endpoint);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// /all
export const fetchInstitutions = async (): Promise<Institution[]> => {
  try {
    const response = await apiClient.get('institutions/all');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const pysicianActionService = async ({
  status,
  payload,
  id,
}: {
  status: string;
  payload?: Payload;
  id: number;
}) => {
  try {
    if (status === 'DELETE') {
      const response = await apiClient.delete(`physicians/${id}`);
      return response.data;
    }

    const data = status === 'APPROVED' ? {} : payload;

    const response = await apiClient.put(
      `physicians/requests/${id}/${status}`,
      data
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const institutionActionService = async ({
  status,
  id,
  payload,
}: {
  status: string;
  id: number;
  payload?: Payload;
}) => {
  try {
    if (status === 'DELETE') {
      const response = await apiClient.delete(`institutions/${id}`);
      return response.data;
    }

    const data = status === 'APPROVED' ? {} : payload;

    const response = await apiClient.put(
      `institutions/requests/${id}/${status}`,
      data
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addAvailability = async ({ data }: { data: TimeSlot }) => {
  const response = await apiClient.post('physicians/work-hour', data);
  return response.data;
};

export const fetchAvailability = async () => {
  const response = await apiClient.get('physicians/work-hour');
  return response.data.data;
};

export const deleteWorkingHour = async (id: number) => {
  const response = await apiClient.delete(`physicians/work-hour/${id}`);
  return response.data;
};

export const fetchAppointments = async () => {
  const response = await apiClient.get(`physicians/appointments`);
  return response.data.data;
};

export const fetchAdminPatients = async () => {
  const response = await apiClient.get(`patients`);
  return response.data.data;
};

export const addPhysicianService = async (data: FormData) => {
  const response = await apiClient.post('/institutions/physicians', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
