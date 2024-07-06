// prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function connectPrisma() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

export async function disconnectPrisma() {
  await prisma.$disconnect();
}
