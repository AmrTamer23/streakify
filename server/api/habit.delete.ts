import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  const { habitId } = body;
  return await delHabit(habitId);
});

export const delHabit = async (habitId: string) => {
  console.log("Deleting....");
  return await prisma.habit.delete({
    where: {
      id: Number(habitId),
    },
  });
};
