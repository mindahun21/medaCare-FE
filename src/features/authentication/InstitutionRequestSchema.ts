import { z } from 'zod';

export const institutionTypes = [
  'hospital',
  'clinic',
  'pharmacy',
  'laboratory',
  'telemedicine_center',
  'health_center',
  'diagnostic_center',
  'nursing_home',
  'rehabilitation_center',
  'specialty_clinic',
] as const;

export const ethiopianRegions = [
  'Addis Ababa',
  'Afar',
  'Amhara',
  'Benishangul-Gumuz',
  'Central Ethiopia',
  'Dire Dawa',
  'Gambela',
  'Harari',
  'Oromia',
  'Sidama',
  'South Ethiopia',
  'South West Ethiopia',
  'Somali',
  'Tigray',
] as const;

export const subcityOptions: Record<string, string[]> = {
  'Addis Ababa': [
    'Addis Ketema',
    'Akaky Kaliti',
    'Arada',
    'Bole',
    'Gullele',
    'Kirkos',
    'Kolfe Keranio',
    'Lideta',
    'Nifas Silk-Lafto',
    'Yeka',
  ],
  'Dire Dawa': ['Sabian', 'Gende Kore', 'Megala'],

  Afar: [
    'Awsi Rasu',
    'Kilbet Rasu',
    'Gabi Rasu',
    'Fanti Rasu',
    'Hari Rasu',
    'Mahi Rasu',
  ],
  Amhara: [
    'North Gondar',
    'South Gondar',
    'North Wollo',
    'South Wollo',
    'East Gojjam',
    'West Gojjam',
    'Agew Awi',
    'Wag Hemra',
    'Central Gondar',
    'North Shewa',
    'Oromia',
    'Bahir Dar',
  ],
  'Benishangul-Gumuz': ['Asosa', 'Kamashi', 'Metekel'],
  'Central Ethiopia': [
    'Gurage',
    'Silte',
    'Hadiya',
    'Kembata',
    'Halaba',
    'Mareko',
    'Tembaro',
  ],
  Gambela: ['Anywaa', 'Majang', 'Nuer'],
  Harari: ['Amir-Nur', 'Shenkor', 'Aboker', 'Dire-Teyara', 'Sofi', 'Erer'],
  Oromia: [
    'Arsi',
    'Bale',
    'Borena',
    'East Hararghe',
    'West Hararghe',
    'East Shewa',
    'West Shewa',
    'North Shewa',
    'Southwest Shewa',
    'Jimma',
    'Illubabor',
    'West Welega',
    'East Welega',
    'Kelam Welega',
    'Horo Guduru Welega',
    'Buno Bedele',
    'West Guji',
    'East Guji',
  ],
  Sidama: ['Hawassa', 'Boricha', 'Dale', 'Wondo Genet', 'Shebedino'],
  'South Ethiopia': [
    'Gamo',
    'Gofa',
    'Konso',
    'Ari',
    'South Omo',
    'Burji',
    'Dirashe',
    'Basketo',
    'Ale',
  ],
  'South West Ethiopia': [
    'Keffa',
    'Sheka',
    'Bench Sheko',
    'Dawro',
    'West Omo',
    'Konta',
  ],
  Somali: [
    'Fafan',
    'Jarar',
    'Sitti',
    'Nogob',
    'Shabelle',
    'Korahe',
    'Afder',
    'Liben',
    'Dollo',
  ],
  Tigray: [
    'Central Tigray',
    'Eastern Tigray',
    'North Western Tigray',
    'Southern Tigray',
    'South Eastern Tigray',
    'Mekelle',
  ],
};

export const InstitutionRequestSchema = z
  .object({
    name: z.string().min(1, 'Institution Name is required'),
    type: z.enum(institutionTypes, {
      required_error: 'Institution type is required',
      invalid_type_error: 'Invalid institution type selected',
    }),
    email: z.string().email({ message: 'Invalid email address' }),
    regionOrState: z.enum(ethiopianRegions, {
      required_error: 'Region is required',
    }),
    subCityOrDistrict: z.string().optional(),
    street: z.string().min(1, 'street is required'),
    businessDocument: z
      .custom<File | null>((file) => file instanceof File || file === null, {
        message: 'File is required',
      })
      .refine((file) => !file || file.size <= 9 * 1024 * 1024, {
        message: 'File size should not exceed 9 MB',
      })
      .refine((file) => !file || ['application/pdf'].includes(file.type), {
        message: 'Invalid file type. Only PDF files are allowed',
      }),
    medicalLicense: z
      .custom<File | null>((file) => file instanceof File || file === null, {
        message: 'File is required',
      })
      .refine((file) => !file || file.size <= 9 * 1024 * 1024, {
        message: 'File size should not exceed 9 MB',
      })
      .refine((file) => !file || ['application/pdf'].includes(file.type), {
        message: 'Invalid file type. Only PDF files are allowed',
      }),
  })
  .superRefine((data, ctx) => {
    const subcities = subcityOptions[data.regionOrState];
    if (
      subcities &&
      (!data.subCityOrDistrict || !subcities.includes(data.subCityOrDistrict))
    ) {
      ctx.addIssue({
        path: ['subcity'],
        code: z.ZodIssueCode.custom,
        message: 'Please select a valid subcity for the selected region',
      });
    }
  });

export type InstitutionRequestSchemaType = z.infer<
  typeof InstitutionRequestSchema
>;
