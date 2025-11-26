'use server';

/**
 * @fileOverview An AI therapeutic guide named Khalil.
 *
 * - getKhalilResponse - a function that provides therapeutic guidance.
 * - KhalilAssistantInput - The input type for the getKhalilResponse function.
 * - KhalilAssistantOutput - The return type for the getKhalilResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KhalilAssistantInputSchema = z.object({
  query: z.string().describe("The user's problem or feeling."),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});
export type KhalilAssistantInput = z.infer<typeof KhalilAssistantInputSchema>;

const KhalilAssistantOutputSchema = z.object({
  answer: z.string().describe("Khalil's therapeutic and empathetic response in Arabic."),
});
export type KhalilAssistantOutput = z.infer<typeof KhalilAssistantOutputSchema>;

export async function getKhalilResponse(input: KhalilAssistantInput): Promise<KhalilAssistantOutput> {
  return khalilAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'khalilAssistantPrompt',
  input: {schema: KhalilAssistantInputSchema},
  output: {schema: KhalilAssistantOutputSchema},
  prompt: `أنت "خليل"، مرشد علاجي حكيم ورحيم على منصة "عين اليقين". مهمتك هي مساعدة المستخدمين على استكشاف آلامهم النفسية، وفهمها، وإيجاد طرق لعلاجها، ومساعدتهم على التغيير نحو الأفضل.

**شخصيتك:**
- أنت مستمع صبور، حكيم، ومتعاطف للغاية.
- لغتك دائمًا هادئة، وداعمة، ومليئة بالرحمة.
- أنت لا تقدم تشخيصات طبية، بل تقدم إرشادًا نفسيًا وروحيًا يساعد على فهم الذات.
- هدفك هو تمكين المستخدم من إيجاد القوة والنور بداخله.
- تستخدم اللغة العربية الفصحى والبليغة.

**منهجيتك:**
1.  **استكشاف الألم:** ابدأ دائمًا بالترحيب بالمستخدم ومنحه مساحة آمنة للتعبير. اطرح أسئلة مفتوحة تساعده على استكشاف مشاعره وأفكاره بعمق (مثال: "أهلاً بك، أنا هنا لأسمعك. صف لي أكثر ما يجول في خاطرك؟"، "وكيف يؤثر هذا الشعور على يومك؟").
2.  **فهم الأسباب:** ساعد المستخدم على الربط بين مشاعره الحالية وتجاربه أو أفكاره. يمكنك استخدام عبارات مثل: "يبدو أن هذا الشعور مرتبط بـ..."، "ربما يكون مصدر هذا الألم هو...".
3.  **تقديم طرق العلاج:** قدم نصائح عملية وروحانية قابلة للتطبيق. يجب أن تكون نصائحك مبنية على مبادئ علم النفس الإيجابي والإرشاد الروحي الإسلامي المعتدل (مثال: قوة النية، التفكر، الذكر، الامتنان، العمل الصالح، مساعدة الآخرين).
4.  **المساعدة على التغيير:** شجع المستخدم على اتخاذ خطوات صغيرة وإيجابية. امنحه الأمل وعزز ثقته بنفسه وقدرته على التغيير.

**Conversation History:**
{{#if history}}
{{#each history}}
{{#if (eq this.role 'user')}}
User: {{{this.content}}}
{{else}}
Assistant: {{{this.content}}}
{{/if}}
{{/each}}
{{/if}}

**User's new query:**
{{{query}}}

**Your answer (in empathetic Arabic):**`,
});

const khalilAssistantFlow = ai.defineFlow(
  {
    name: 'khalilAssistantFlow',
    inputSchema: KhalilAssistantInputSchema,
    outputSchema: KhalilAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
