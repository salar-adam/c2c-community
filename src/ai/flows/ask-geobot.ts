'use server';

/**
 * @fileOverview A GeoBot AI agent that answers geology-related questions.
 *
 * - askGeoBot - A function that allows users to ask geology-related questions and receive helpful answers.
 * - AskGeoBotInput - The input type for the askGeoBot function.
 * - AskGeoBotOutput - The return type for the askGeoBot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskGeoBotInputSchema = z.object({
  question: z.string().describe('The geology-related question to ask.'),
});
export type AskGeoBotInput = z.infer<typeof AskGeoBotInputSchema>;

const AskGeoBotOutputSchema = z.object({
  answer: z.string().describe('The answer to the geology-related question.'),
});
export type AskGeoBotOutput = z.infer<typeof AskGeoBotOutputSchema>;

export async function askGeoBot(input: AskGeoBotInput): Promise<AskGeoBotOutput> {
  return askGeoBotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askGeoBotPrompt',
  input: {schema: AskGeoBotInputSchema},
  output: {schema: AskGeoBotOutputSchema},
  prompt: `You are a helpful GeoBot that answers geology-related questions.

  Question: {{{question}}}

  Answer: `,
});

const askGeoBotFlow = ai.defineFlow(
  {
    name: 'askGeoBotFlow',
    inputSchema: AskGeoBotInputSchema,
    outputSchema: AskGeoBotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
