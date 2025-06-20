import { z } from 'zod';

export const CompletePhysicianProfileSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^(\+251|0)(9\d{8}|7\d{8})$/, 'Invalid Ethiopian phone number')
    .min(1, 'Phone number is required'),
  gender: z.enum(['female', 'male'], {
    required_error: 'Gender is required',
  }),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (yyyy-mm-dd)')
    .min(1, 'Date of birth is required')
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
    }, 'You must be at least 18 years old'),
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
        message: 'Invalid file type. Only JPEG and PNG images are allowed',
      }
    ),
  nationalId: z
    .custom<File>((file) => file instanceof File, {
      message: 'this is required field',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'File size should not exceed 9 MB',
    })
    .refine((file) => ['application/pdf'].includes(file.type), {
      message: 'Invalid file type. Only PDF files are allowed',
    }),

  resume: z
    .custom<File>((file) => file instanceof File, {
      message: 'File is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'File size should not exceed 9 MB',
    })
    .refine((file) => ['application/pdf'].includes(file.type), {
      message: 'Invalid file type. Only PDF files are allowed',
    }),
  medicalLicense: z
    .custom<File>((file) => file instanceof File, {
      message: 'File is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'File size should not exceed 9 MB',
    })
    .refine((file) => ['application/pdf'].includes(file.type), {
      message: 'Invalid file type. Only PDF files are allowed',
    }),
  specializationDoc: z
    .custom<File>((file) => file instanceof File, {
      message: 'File is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'File size should not exceed 9 MB',
    })
    .refine((file) => ['application/pdf'].includes(file.type), {
      message: 'Invalid file type. Only PDF files are allowed',
    }),
  degreeCertificate: z
    .custom<File>((file) => file instanceof File, {
      message: 'File is required',
    })
    .refine((file) => file.size <= 9 * 1024 * 1024, {
      message: 'File size should not exceed 9 MB',
    })
    .refine((file) => ['application/pdf'].includes(file.type), {
      message: 'Invalid file type. Only PDF files are allowed',
    }),
});

export type CompletePhysicianProfileType = z.infer<
  typeof CompletePhysicianProfileSchema
>;
