import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//@ts-ignore
export default defineEventHandler(async (e) => {
  // @ts-ignore
  const body = await readBody(e);
  const { icon, title, userId } = body;
  return await addHabit(icon, title, userId);
});

export const addHabit = async (icon: string, title: string, userId: string) => {
  return await prisma.habit.create({
    data: {
      icon,
      title,
      userId: userId,
    },
  });
};
