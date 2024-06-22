import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function diffDates(date1: string, date2: number) {
  // Convert ISO string to Date object
  let isoDate = new Date(date1);

  // Calculate the difference in milliseconds
  let differenceMs = date2 - isoDate.getTime();

  // Convert milliseconds to days (optional)
  let differenceDays = differenceMs / (1000 * 60 * 60 * 24);

  return differenceDays;
}

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
  return await prisma.habit
    .findUnique({
      where: {
        id: habitId,
      },
    })
    .then(async (habit) => {
      console.log(habit);
      if (
        habit?.activity &&
        typeof habit?.activity === "object" &&
        Array.isArray(habit?.activity)
      ) {
        let activityObject = habit?.activity as Prisma.JsonArray;

        activityObject.push({
          x:
            activityObject.length > 0
              ? diffDates(
                  (activityObject[activityObject.length - 1] as Activity).date,
                  date
                )
              : 1,
          y: isDone ? 1 : 0,
          date: new Date(date).toISOString(),
        });

        await prisma.habit.update({
          where: {
            id: habitId,
          },
          data: {
            activity: activityObject,
          },
        });
      }
    });
};
