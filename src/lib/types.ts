import { z } from 'zod';

export const personalPathSchema = z.object({
  beliefs: z.string().min(20, { message: 'يرجى مشاركة المزيد عن معتقداتك (20 حرفًا على الأقل).' }).max(2000),
  background: z.string().min(20, { message: 'يرجى مشاركة المزيد عن خلفيتك (20 حرفًا على الأقل).' }).max(2000),
  aspirations: z.string().min(20, { message: 'يرجى مشاركة المزيد عن تطلعاتك (20 حرفًا على الأقل).' }).max(2000),
});

export type PersonalPathFormValues = z.infer<typeof personalPathSchema>;

export type VoiceChatRoom = {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    creationDate: string;
    members: { [key: string]: 'owner' | 'speaker' | 'listener' };
};

export type VideoChatRoom = {
    id: string;
    name: string;
    presenter: string;
    ownerId: string;
    creationDate: string;
    members: { [key: string]: 'owner' | 'viewer' };
};

export type VoiceChatMessage = {
    id: string;
    roomId: string;
    senderId: string;
    message: string;
    timestamp: string;
};

export const volunteerSchema = z.object({
  firstName: z.string().min(2, { message: "الاسم الأول مطلوب." }),
  lastName: z.string().min(2, { message: "الاسم الأخير مطلوب." }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح." }),
  phoneNumber: z.string().optional(),
  country: z.string().min(2, { message: "الدولة مطلوبة." }),
  availability: z.enum(["few_hours_week", "part_time", "full_time"], {
    errorMap: () => ({ message: "يرجى تحديد مدى توفرك." })
  }),
  skills: z.array(z.string()).min(1, { message: "يرجى تحديد مهارة واحدة على الأقل." }),
  interests: z.array(z.string()).min(1, { message: "يرجى تحديد مجال اهتمام واحد على الأقل." }),
  notes: z.string().optional(),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;

export type Volunteer = VolunteerFormValues & {
  id: string;
};

export type UserProfile = {
    id: string;
    displayName: string;
    photoURL: string;
    points: number;
    title: string;
    badges: string[];
    stats: {
        storiesPublished: number;
        forumPosts: number;
        audioContributions: number;
    };
};
