import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysBetweenDates(date1: number, date2: number): number {
  const MILLISINDAY = 1000 * 60 * 60 * 24;
  return Math.abs(date1 - date2) / MILLISINDAY;
}

export function checkActivitiesForToday(activities: Activity[]): boolean {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();
  const startOfTomorrow = startOfToday + 24 * 60 * 60 * 1000;

  const isDoneForToday: boolean = activities.some((activity) => {
    return (
      Number(activity.date) >= startOfToday &&
      Number(activity.date) < startOfTomorrow
    );
  });

  return isDoneForToday;
}

export function calculateLongestStreak(activities: Activity[]): number {
  if (activities.length === 0) return 0;

  // Sort activities by date
  const sortedActivities = activities.sort((a, b) =>
    dayjs(a.date).diff(dayjs(b.date))
  );

  let currentStreak = 1;
  let longestStreak = 1;
  let previousDate = dayjs(sortedActivities[0].date);

  for (let i = 1; i < sortedActivities.length; i++) {
    const currentDate = dayjs(sortedActivities[i].date);
    const diffDays = currentDate.diff(previousDate, "day");

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else if (diffDays > 1) {
      currentStreak = 1;
    }

    previousDate = currentDate;
  }

  return longestStreak;
}
