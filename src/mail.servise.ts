import OpenAI from 'openai';
import fs from 'fs/promises';
import { MailCategorieResponseSchema } from './schema.js'; // Make sure this file exists
import { openai } from '../lib/openai.js';



export class MailService {
  async sortMail( mail: mail) {
    console.log(`Request to OpenAI for mail: ${mail.title}...`);
    
    const validatedResult = {
      categorie: "Spam",
      summary: "Bla-bla-bla"
    };

    const dir = './results';
    await fs.mkdir(dir, { recursive: true });
    const fileName = `${dir}/${mail.title.replace(/\s+/g, '_')}.json`;
    await fs.writeFile(fileName, JSON.stringify(validatedResult, null, 2));
    // console.log(`Request to OpenAI for mail: ${mail.title}...`);

    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4o',
    //   messages: [
    //     { role: 'system', content: 'You are a email analyze system. Respond STRICTLY in JSON format.' },
    //     { role: 'user', content: `mail title: ${mail.title} - mail body: ${mail.body}\n\n` }
    //   ],
    //   response_format: { type: 'json_object' },
    // });

    // const responseContent = completion.choices[0].message.content || '{}';
    // const result = JSON.parse(responseContent);

    // // Validate the response with Zod
    // const validatedResult = MailCategorieResponseSchema.parse(result);

    // // Save the result
    // const dir = './results';
    // await fs.mkdir(dir, { recursive: true });
    // const fileName = `${dir}/${mail.title.replace(/\s+/g, '_')}.json`;
    // await fs.writeFile(fileName, JSON.stringify(validatedResult, null, 2));
    
    return validatedResult;
  }
}