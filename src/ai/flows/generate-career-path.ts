'use server';

/**
 * @fileOverview An AI agent that generates personalized career paths for geoscientists.
 *
 * - generateCareerPath - A function that suggests career paths based on skills, interests, and goals.
 * - GenerateCareerPathInput - The input type for the generateCareerPath function.
 * - GenerateCareerPathOutput - The return type for the generateCareerPath function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCareerPathInputSchema = z.object({
  skills: z.string().describe('The user\'s current skills.'),
  interests: z.string().describe('The user\'s geoscience interests.'),
  goals: z.string().describe('The user\'s career goals.'),
});
export type GenerateCareerPathInput = z.infer<typeof GenerateCareerPathInputSchema>;

const GenerateCareerPathOutputSchema = z.object({
  suggestedRoles: z.array(z.object({
    name: z.string().describe('A suggested job role.'),
    description: z.string().describe('A brief description of the role.'),
  })).describe('A list of suggested career roles for the user.'),
  skillGaps: z.array(z.string()).describe('A list of recommended skills the user should develop.'),
  nextSteps: z.array(z.object({
    title: z.string().describe('A specific, actionable next step.'),
    category: z.enum(["Education", "Networking", "Job Search"]).describe('The category of the next step.'),
  })).describe('A list of actionable next steps for the user to take.'),
});
export type GenerateCareerPathOutput = z.infer<typeof GenerateCareerPathOutputSchema>;

export async function generateCareerPath(input: GenerateCareerPathInput): Promise<GenerateCareerPathOutput> {
  return generateCareerPathFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerPathPrompt',
  input: { schema: GenerateCareerPathInputSchema },
  output: { schema: GenerateCareerPathOutputSchema },
  prompt: `You are an expert career advisor for the geoscience industry. Your task is to provide a personalized career path recommendation based on the user's input.

Analyze the user's current skills, interests, and goals to provide the following:
1.  **Suggested Roles**: Recommend 2-3 specific job roles that align with their input. Provide a brief, one-sentence description for each role.
2.  **Skill Gaps**: Identify 2-4 key skills they should develop to achieve their goals. These can be software, methodologies, or certifications.
3.  **Actionable Next Steps**: Provide a list of 3 concrete, actionable next steps. Categorize each step as "Education", "Networking", or "Job Search".

User's Current Skills:
{{{skills}}}

User's Geoscience Interests:
{{{interests}}}

User's Career Goals:
{{{goals}}}
`,
});

const generateCareerPathFlow = ai.defineFlow(
  {
    name: 'generateCareerPathFlow',
    inputSchema: GenerateCareerPathInputSchema,
    outputSchema: GenerateCareerPathOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
