import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  return await prisma.habit.create({
    data: {
      icon,
      title,
      userId: userId,
      weeklyTarget: target,
    },
  });
};
