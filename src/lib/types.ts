import { z } from 'zod';

export const personalPathSchema = z.object({
  beliefs: z.string().min(20, { message: 'Please share a bit more about your beliefs (at least 20 characters).' }).max(2000),
  background: z.string().min(20, { message: 'Please share a bit more about your background (at least 20 characters).' }).max(2000),
  aspirations: z.string().min(20, { message: 'Please share a bit more about your aspirations (at least 20 characters).' }).max(2000),
});

export type PersonalPathFormValues = z.infer<typeof personalPathSchema>;
