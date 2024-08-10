import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// server/api/habits/line-chart.ts
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
    const activities = await prisma.activity.findMany({
      include: { habit: true },
      orderBy: { date: "asc" },
      where: {
        habit: {
          userId: userId,
        },
      },
    });

    const chartData = activities.reduce<Record<string, number>>(
      (acc, activity) => {
        const date = activity.date;
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      },
      {}
    );

    const lineChartData = Object.entries(chartData).map(([date, count]) => ({
      date,
      count,
    }));

    return lineChartData;
  } catch (error) {
    console.error("Error fetching line chart data:", error);
    return { error: "Failed to fetch line chart data" };
  }
});
