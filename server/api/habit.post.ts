import { PrismaClient } from "@prisma/client";

//@ts-ignore
export default defineEventHandler(async (e) => {
  // @ts-ignore
  const body = await readBody(e);
  const { icon, title, userId, target } = body;
  return await addHabit(icon, title, userId, target);
});

export const addHabit = async (
  icon: string,
  title: string,
  userId: string,
  target: number
) => {
  const prisma = new PrismaClient();

  try {
    return await prisma.habit.create({
      data: {
        icon,
        title,
        userId,
        weeklyTarget: target,
      },
    });
  } catch (error) {
    console.error("Error in habit post handler:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
