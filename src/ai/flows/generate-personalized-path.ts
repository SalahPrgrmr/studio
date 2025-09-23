'use server';

/**
 * @fileOverview AI-powered personal path generation flow.
 *
 * - generatePersonalizedPath - A function that generates personalized steps towards discovering certainty.
 * - GeneratePersonalizedPathInput - The input type for the generatePersonalizedPath function.
 * - GeneratePersonalizedPathOutput - The return type for the generatePersonalizedPath function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedPathInputSchema = z.object({
  beliefs: z
    .string()
    .describe('Information about the user\'s current beliefs.'),
  background: z
    .string()
    .describe('Information about the user\'s background and experiences.'),
  aspirations: z
    .string()
    .describe('Information about the user\'s aspirations and goals.'),
});
export type GeneratePersonalizedPathInput = z.infer<typeof GeneratePersonalizedPathInputSchema>;

const GeneratePersonalizedPathOutputSchema = z.object({
  personalizedPath: z
    .string()
    .describe('A list of actionable steps towards discovering certainty, tailored to the user\'s input.'),
});
export type GeneratePersonalizedPathOutput = z.infer<typeof GeneratePersonalizedPathOutputSchema>;

export async function generatePersonalizedPath(
  input: GeneratePersonalizedPathInput
): Promise<GeneratePersonalizedPathOutput> {
  return generatePersonalizedPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedPathPrompt',
  input: {schema: GeneratePersonalizedPathInputSchema},
  output: {schema: GeneratePersonalizedPathOutputSchema},
  prompt: `Based on the user's beliefs, background, and aspirations, create a personalized path with actionable steps towards discovering certainty.

Beliefs: {{{beliefs}}}
Background: {{{background}}}
Aspirations: {{{aspirations}}}

Personalized Path:`,
});

const generatePersonalizedPathFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedPathFlow',
    inputSchema: GeneratePersonalizedPathInputSchema,
    outputSchema: GeneratePersonalizedPathOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
