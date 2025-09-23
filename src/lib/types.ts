import { z } from 'zod';

export const personalPathSchema = z.object({
  beliefs: z.string().min(20, { message: 'يرجى مشاركة المزيد عن معتقداتك (20 حرفًا على الأقل).' }).max(2000),
  background: z.string().min(20, { message: 'يرجى مشاركة المزيد عن خلفيتك (20 حرفًا على الأقل).' }).max(2000),
  aspirations: z.string().min(20, { message: 'يرجى مشاركة المزيد عن تطلعاتك (20 حرفًا على الأقل).' }).max(2000),
});

export type PersonalPathFormValues = z.infer<typeof personalPathSchema>;
