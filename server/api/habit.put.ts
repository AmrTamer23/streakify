import { PrismaClient } from "@prisma/client";
import { daysBetweenDates } from "~/lib/utils";
const prisma = new PrismaClient();

//@ts-ignore
export default defineEventHandler(async (e) => {
  // @ts-ignore
  const body = await readBody(e);
  let { habitId, isDone } = body;
  const timestamp = Date.now();

  return await updateHabit(isDone, habitId, timestamp);
});

export const updateHabit = async (
  isDone: boolean,
  habitId: number,
  date: number
) => {
  return await prisma.activity
    .findMany({
      where: {
        habitId,
      },
      orderBy: {
        date: "asc",
      },
      take: 1,
    })
    .then(async (activity) => {
      if (activity.length === 0) {
        return await prisma.activity.create({
          data: {
            date: date.toString(),
            habitId,
            x: 1,
            y: isDone ? 1 : 0,
          },
        });
      }
      let lastActivity = activity[0];
      let lastActivityDate = lastActivity?.date;
      console.log(Number(lastActivityDate));
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
    });
};
