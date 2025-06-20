import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

beforeAll(async () => {
  const databaseURL = process.env.DATABASE_URL;

  if (!databaseURL) {
    throw new Error('DATABASE_URL is not set');
  }

  const PORT = 3307;

  process.env.DATABASE_URL = databaseURL.replace('3306', PORT.toString());

  execSync('npx prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$disconnect();
});
