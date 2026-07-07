import Fastify from 'fastify';
import 'dotenv/config'; 
import { MailService } from './mail.servise.js';
import { z } from 'zod';

// Define the schema of what WE EXPECT from the client
const RequestSchema = z.object({
  mail: z.object({
    title: z.string(),
    body: z.string(),
  })
});

const fastify = Fastify({
  logger: true 
});
const service = new MailService();

// Analysis endpoint
fastify.post('/classify-email', async (request, reply) => {
  // Validate! If the data is invalid, Zod will throw a clear error.
  const body = RequestSchema.parse(request.body);
  
  const result = await service.sortMail( body.mail);
  return { status: 'success', data: result };
});

// Global error handler
fastify.setErrorHandler((error, request, reply) => {
    console.error('SERVER ERROR:', error);
  if (error.name === 'ZodError') {
    return reply.status(400).send({ 
      status: 'error', 
      message: 'Invalid data',
      details: error.issues 
    });
  }
  request.log.error({ err: error }, 'Error caught in global error handler');
  reply.status(500).send({ 
    status: 'error', 
    message: 'Something went wrong on the server'
  });
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();