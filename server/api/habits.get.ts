import { PrismaClient } from "@prisma/client";

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
  } finally {
    await prisma.$disconnect();
  }
};

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
    return await getHabits(userId);
  } catch (error) {
    console.error("Error in habits get handler:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
