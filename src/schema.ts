import { z } from 'zod';

export const MailCategorieResponseSchema = z.object({
  categorie: z.string().describe("Describe categorie of mail from Urgent, Meeting, Spam, Other"),
  summary: z.string().describe("Short summary of email in 15 words maximum")
});