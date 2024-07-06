import { prisma, connectPrisma, disconnectPrisma } from "~/server/prisma";
import { daysBetweenDates } from "~/lib/utils";

export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  let { habitId, isDone } = body;
  const timestamp = Date.now();

  try {
    await connectPrisma();
    const result = await updateHabit(isDone, habitId, timestamp);
    return result;
  } catch (error) {
    console.error("Error in habit update handler:", error);
    throw error;
  } finally {
    await disconnectPrisma();
  }
});

export const updateHabit = async (
  isDone: boolean,
  habitId: number,
  date: number
) => {
  try {
    const activity: Activity[] = await prisma.$queryRaw`
      SELECT * FROM "Activity"
      WHERE "habitId" = ${habitId}
      ORDER BY date ASC
      LIMIT 1
    `;

    if (!activity || activity.length === 0) {
      return await prisma.activity.create({
        data: {
          date: date.toString(),
          habitId,
          x: 1,
          y: isDone ? 1 : 0,
        },
      });
    }

    let lastActivityDate = activity[0].date;
    let daysSinceLastActivity = daysBetweenDates(
      Number(lastActivityDate),
      date
    );

    if (daysSinceLastActivity > 1) {
      return await prisma.activity.create({
        data: {
          date: date.toString(),
          habitId,
          x: daysSinceLastActivity,
          y: isDone ? 1 : 0,
        },
      });
    } else {
      return "Already updated today!";
    }
  } catch (error) {
    console.error("Error updating habit:", error);
    throw error;
  }
};
