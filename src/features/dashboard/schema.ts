import { z } from 'zod';

export const AddPhysicianSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .regex(/^(\+251|0)(9\d{8}|7\d{8})$/, 'Invalid Ethiopian phone number'),

  gender: z.enum(['Male', 'Female'], {
    required_error: 'Gender is required',
  }),

  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (yyyy-mm-dd)')
    .refine((date) => {
      const today = new Date();
      const dob = new Date(date);
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      return (
        age > 18 ||
        (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
      );
    }, 'Physician must be at least 18 years old'),

  specialization: z.string().min(1, 'Specialization is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  education: z.string().min(1, 'Education info is required'),
  experience: z
    .string()
    .min(1, 'Experience is required')
    .regex(/^\d+$/, 'Experience must be a number'),

  languagesSpoken: z.string().min(1, 'Languages spoken are required'),

  profilePhoto: z
    .custom<File>((file) => file instanceof File, {
      message: 'Profile photo is required',
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should not exceed 5 MB',
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      {
        message: 'Only JPEG or PNG files are allowed',
      }
    ),

  nationalId: z
    .custom<File>((file) => file instanceof File, {
      message: 'National ID is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'Max file size is 9 MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    }),

  resume: z
    .custom<File>((file) => file instanceof File, {
      message: 'Resume is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'Max file size is 9 MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    }),

  medicalLicense: z
    .custom<File>((file) => file instanceof File, {
      message: 'Medical license is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'Max file size is 9 MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    }),

  specializationDoc: z
    .custom<File>((file) => file instanceof File, {
      message: 'Specialization document is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'Max file size is 9 MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    }),

  degreeCertificate: z
    .custom<File>((file) => file instanceof File, {
      message: 'Degree certificate is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'Max file size is 9 MB',
    })
    .refine((file) => file.type === 'application/pdf', {
      message: 'Only PDF files are allowed',
    }),
});

export type AddPhysicianType = z.infer<typeof AddPhysicianSchema>;
