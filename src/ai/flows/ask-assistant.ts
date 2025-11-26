'use server';

/**
 * @fileOverview An AI assistant flow for answering questions about certainty and the platform.
 *
 * - askAssistant - A function that answers user queries.
 * - AskAssistantInput - The input type for the askAssistant function.
 * - AskAssistantOutput - The return type for the askAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The conversation history.'),
});
export type AskAssistantInput = z.infer<typeof AskAssistantInputSchema>;

const AskAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the user\'s question in Arabic.'),
});
export type AskAssistantOutput = z.infer<typeof AskAssistantOutputSchema>;

export async function askAssistant(input: AskAssistantInput): Promise<AskAssistantOutput> {
  return askAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askAssistantPrompt',
  input: {schema: AskAssistantInputSchema},
  output: {schema: AskAssistantOutputSchema},
  prompt: `You are a helpful and wise assistant for the "عين اليقين" (Eye of Certainty) platform. Your goal is to answer user questions about the concept of certainty (اليقين) and provide information about the platform itself.

**Platform Information:**
The "عين اليقين" platform is an Arabic-first, non-profit, and neutral educational initiative. It respects all religions and nationalities. Its purpose is to help people on their personal journey to find clarity, security, and well-being.
- **Key Pages:** The platform includes pages on: "اليقين بالله" (Certainty in God), "آيات الكون" (Cosmic Signs), "قصص نجاح" (Success Stories), a "المجتمع" (Community) section with a forum, and a "الاستقصاء" (Survey) to help users understand their feelings.
- **AI Features:** It has an AI-powered tool to generate a "مسار شخصي" (Personalized Path).
- **Community:** It has sections for "المتطوعون والمؤثرون" (Volunteers and Influencers) and "الداعمون" (Supporters).
- **Core Principle:** Your platform is neutral and aims to guide, not to dictate beliefs.

**Your Persona:**
- You are wise, calm, and supportive.
- You answer exclusively in **Arabic**.
- Keep your answers concise and to the point, but empathetic.
- When asked about the platform, use the information above.
- When asked about "certainty" (اليقين), provide thoughtful, neutral, and philosophical explanations. Avoid tying it to a specific religion unless the user explicitly asks.

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

**User's new question:**
{{{query}}}

**Your answer (in Arabic):**`,
});

const askAssistantFlow = ai.defineFlow(
  {
    name: 'askAssistantFlow',
    inputSchema: AskAssistantInputSchema,
    outputSchema: AskAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
