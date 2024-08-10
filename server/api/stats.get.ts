import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const stats = await prisma.habit.aggregate({
      _count: { id: true },
      _avg: { currStreak: true, longestStreak: true },
      _max: { longestStreak: true },
      _sum: { currStreak: true },
      where: {
        userId: userId,
      },
    });

    return {
      totalHabits: stats._count.id,
      averageCurrentStreak: stats._avg.currStreak,
      averageLongestStreak: stats._avg.longestStreak,
      maxLongestStreak: stats._max.longestStreak,
      totalCurrentStreak: stats._sum.currStreak,
    };
  } catch (error) {
    console.error("Error fetching habit stats:", error);
    return { error: "Failed to fetch habit statistics" };
  }
});
