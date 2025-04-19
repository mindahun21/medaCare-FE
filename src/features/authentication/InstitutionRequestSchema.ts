import { z } from 'zod';

export const InstitutionRequestSchema = z.object({});

export type InstitutionRequestSchemaType = z.infer<
  typeof InstitutionRequestSchema
>;
