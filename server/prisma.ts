// prisma.ts
// import { PrismaClient } from "@prisma/client";

import { type PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export async function disconnectPrisma(prisma: PrismaClient) {
  await prisma.$disconnect();
}
