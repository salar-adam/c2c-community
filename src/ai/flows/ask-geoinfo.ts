'use server';

/**
 * @fileOverview A GeoInfo AI agent that answers geology-related questions.
 *
 * - askGeoInfo - A function that allows users to ask geology-related questions and receive helpful answers.
 * - AskGeoInfoInput - The input type for the askGeoInfo function.
 * - AskGeoInfoOutput - The return type for the askGeoInfo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AskGeoInfoInputSchema = z.object({
  question: z.string().describe('The geology-related question to ask.'),
});
export type AskGeoInfoInput = z.infer<typeof AskGeoInfoInputSchema>;

const AskGeoInfoOutputSchema = z.object({
  answer: z.string().describe('The answer to the geology-related question.'),
});
export type AskGeoInfoOutput = z.infer<typeof AskGeoInfoOutputSchema>;

export async function askGeoInfo(input: AskGeoInfoInput): Promise<AskGeoInfoOutput> {
  return askGeoInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askGeoInfoPrompt',
  input: {schema: AskGeoInfoInputSchema},
  output: {schema: AskGeoInfoOutputSchema},
  prompt: `You are a helpful GeoInfo assistant that answers geology-related questions.

  Question: {{{question}}}

  Answer: `,
});

const askGeoInfoFlow = ai.defineFlow(
  {
    name: 'askGeoInfoFlow',
    inputSchema: AskGeoInfoInputSchema,
    outputSchema: AskGeoInfoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
