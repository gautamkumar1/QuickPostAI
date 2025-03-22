import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
});

async function connectDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  }
}

export { prisma, connectDB };
