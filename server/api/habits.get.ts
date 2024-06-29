import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//@ts-ignore
export default defineEventHandler(async (e) => {
  const userId = e.path.split("?").pop();
  if (!userId) {
    return new Response("Bad Request", { status: 400 });
  }
  const habits = await getHabits(userId);
  if (!habits) {
    return new Response("Habits not found", { status: 404 });
  }
  return habits;
});

const getHabits = async (userId: string) => {
  return await prisma.habit.findMany({
    where: {
      userId: userId,
    },
    include: {
      activities: true,
    },
  });
};
