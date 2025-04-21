import { z } from 'zod';

export const InstitutionRequestSchema = z.object({
  institutionName: z.string().min(1, 'Institution is required'),
});

export type InstitutionRequestSchemaType = z.infer<
  typeof InstitutionRequestSchema
>;
