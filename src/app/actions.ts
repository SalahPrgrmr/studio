'use server';

import { generatePersonalizedPath, GeneratePersonalizedPathInput } from '@/ai/flows/generate-personalized-path';
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
