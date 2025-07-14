// Summarize Data Flow
'use server';
/**
 * @fileOverview Summarizes research papers or log data to provide a simplified interpretation.
 *
 * - summarizeData - A function that handles the summarization process.
 * - SummarizeDataInput - The input type for the summarizeData function.
 * - SummarizeDataOutput - The return type for the summarizeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDataInputSchema = z.object({
  data: z
    .string()
    .describe('The research paper or log data to summarize.'),
});
export type SummarizeDataInput = z.infer<typeof SummarizeDataInputSchema>;

const SummarizeDataOutputSchema = z.object({
  summary: z.string().describe('A simplified interpretation of the content.'),
});
export type SummarizeDataOutput = z.infer<typeof SummarizeDataOutputSchema>;

export async function summarizeData(input: SummarizeDataInput): Promise<SummarizeDataOutput> {
  return summarizeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDataPrompt',
  input: {schema: SummarizeDataInputSchema},
  output: {schema: SummarizeDataOutputSchema},
  prompt: `You are an expert in geoscience data interpretation.

You will receive a research paper or log data. Your task is to provide a simplified interpretation of the content, highlighting key findings and insights in a way that is easy to understand.

Data: {{{data}}}`,
});

const summarizeDataFlow = ai.defineFlow(
  {
    name: 'summarizeDataFlow',
    inputSchema: SummarizeDataInputSchema,
    outputSchema: SummarizeDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
