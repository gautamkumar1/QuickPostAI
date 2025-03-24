import { PrismaClient } from '@prisma/client';
import logger from '../../logger.js';

const prisma = new PrismaClient({
});

async function connectDB() {
  try {
    await prisma.$connect();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('❌ Error connecting to the database:', error);
  }
}

export { prisma, connectDB };
