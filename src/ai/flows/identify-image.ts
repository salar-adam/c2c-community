'use server';

/**
 * @fileOverview An image identification AI agent for rocks and strata.
 *
 * - identifyImage - A function that handles the image identification process.
 * - IdentifyImageInput - The input type for the identifyImage function.
 * - IdentifyImageOutput - The return type for the identifyImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a rock or strata, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyImageInput = z.infer<typeof IdentifyImageInputSchema>;

const IdentifyImageOutputSchema = z.object({
  identification: z.object({
    likelyType: z.string().describe('The likely type of rock or strata.'),
    confidence: z
      .number()
      .describe("A confidence score (0-1) of the identification's accuracy."),
    description: z
      .string()
      .describe('A detailed description of the identified rock or strata.'),
  }),
});
export type IdentifyImageOutput = z.infer<typeof IdentifyImageOutputSchema>;

export async function identifyImage(input: IdentifyImageInput): Promise<IdentifyImageOutput> {
  return identifyImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyImagePrompt',
  input: {schema: IdentifyImageInputSchema},
  output: {schema: IdentifyImageOutputSchema},
  prompt: `You are an expert geologist specializing in identifying rocks and strata from images.

You will use the image to make a preliminary identification of the sample, and provide a confidence score of the identification's accuracy and a detailed description.

Analyze the following image:

{{media url=photoDataUri}}`,
});

const identifyImageFlow = ai.defineFlow(
  {
    name: 'identifyImageFlow',
    inputSchema: IdentifyImageInputSchema,
    outputSchema: IdentifyImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
