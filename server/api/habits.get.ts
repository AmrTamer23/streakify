import { prisma, connectPrisma, disconnectPrisma } from "~/server/prisma";

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
    await connectPrisma();
    const habits = await getHabits(userId);
    return habits;
  } catch (error) {
    console.error("Error in habits get handler:", error);
    throw error;
  } finally {
    await disconnectPrisma();
  }
});

const getHabits = async (userId: string) => {
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
