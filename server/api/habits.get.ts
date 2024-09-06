import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query.userId as string;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "UserId is required",
    });
  }

  try {
    const habits = await getHabits(userId);
    return habits;
  } catch (error) {
    console.error("Error in habits get handler:", error);
    throw error;
  } finally {
  }
});

const getHabits = async (userId: string) => {
  const prisma = new PrismaClient();

  try {
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
      include: {
        activities: true,
      },
    });
    return habits;
  } catch (error) {
    console.error("Error fetching habits:", error);
    throw error;
  }
};
