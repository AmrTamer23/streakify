import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
