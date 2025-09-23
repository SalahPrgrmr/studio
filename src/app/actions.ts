'use server';

import { generatePersonalizedPath, GeneratePersonalizedPathInput } from '@/ai/flows/generate-personalized-path';
import { askAssistant, AskAssistantInput } from '@/ai/flows/ask-assistant';
import { personalPathSchema } from '@/lib/types';

interface ActionResult {
  data?: { personalizedPath: string };
  error?: string;
  details?: unknown;
}

export async function createPersonalizedPath(
  data: GeneratePersonalizedPathInput
): Promise<ActionResult> {
  const validation = personalPathSchema.safeParse(data);
  if (!validation.success) {
    return { error: 'Invalid input.', details: validation.error.flatten() };
  }

  try {
    const result = await generatePersonalizedPath(validation.data);
    if (!result || !result.personalizedPath) {
      return { error: 'The AI could not generate a path. Please try refining your input.' };
    }
    return { data: result };
  } catch (error) {
    console.error('Error generating personalized path:', error);
    return { error: 'An unexpected error occurred on our end. Please try again later.' };
  }
}

interface AssistantActionResult {
  data?: { answer: string };
  error?: string;
}

export async function getAssistantResponse(
  input: AskAssistantInput
): Promise<AssistantActionResult> {
  if (!input.query || input.query.trim().length === 0) {
    return { error: 'Query cannot be empty.' };
  }

  try {
    const result = await askAssistant(input);
    if (!result || !result.answer) {
      return { error: 'The assistant could not provide an answer. Please try again.' };
    }
    return { data: result };
  } catch (error) {
    console.error('Error getting assistant response:', error);
    return { error: 'An unexpected error occurred on our end. Please try again later.' };
  }
}
