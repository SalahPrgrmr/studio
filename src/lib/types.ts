import { z } from 'zod';

export const personalPathSchema = z.object({
  beliefs: z.string().min(20, { message: 'يرجى مشاركة المزيد عن معتقداتك (20 حرفًا على الأقل).' }).max(2000),
  background: z.string().min(20, { message: 'يرجى مشاركة المزيد عن خلفيتك (20 حرفًا على الأقل).' }).max(2000),
  aspirations: z.string().min(20, { message: 'يرجى مشاركة المزيد عن تطلعاتك (20 حرفًا على الأقل).' }).max(2000),
});

export type PersonalPathFormValues = z.infer<typeof personalPathSchema>;

export const signupSchema = z.object({
  displayName: z.string().min(3, { message: 'الاسم يجب أن يكون 3 أحرف على الأقل.' }),
  email: z.string().email({ message: 'البريد الإلكتروني غير صالح.' }),
  password: z.string().min(6, { message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين.",
  path: ["confirmPassword"], // path of error
});

export type SignupFormValues = z.infer<typeof signupSchema>;


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
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "يجب الموافقة على شروط الخدمة للانضمام."
  }),
});

export type VolunteerFormValues = z.infer<typeof volunteerSchema>;

export type Volunteer = VolunteerFormValues & {
  id: string;
  lastUpdated?: string;
};

export type UserProfile = {
    id: string;
    displayName: string;
    email: string;
    photoURL: string;
    role: 'admin' | 'editor' | 'moderator' | 'user';
    points: number;
    title: string;
    badges: string[];
    stats: {
        storiesPublished: number;
        forumPosts: number;
        audioContributions: number;
    };
    createdAt?: {
      _seconds: number;
      _nanoseconds: number;
    } | string;
};

export type SuccessStory = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  content: string;
  creationDate: string;
  status: 'pending_review' | 'approved';
  imageId?: string;
};

export type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  avatarUrl: string;
  timestamp: string;
  tags?: string[];
  likes?: string[];
  commentCount?: number;
};

export type ForumComment = {
  id: string;
  author: string;
  authorId: string;
  avatarUrl: string;
  text: string;
  timestamp: string;
};
