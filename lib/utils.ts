import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

export const calculateAverageHabitsPerDay = (habits: Habit[]): number => {
  if (!habits || habits.length === 0) return 0;

  const activityDates = new Map<string, number>();

  for (const habit of habits) {
    for (const activity of habit.activities || []) {
      const dateKey = new Date(activity.date).toDateString();
      activityDates.set(dateKey, (activityDates.get(dateKey) || 0) + 1);
    }
  }

  const totalDays = activityDates.size;
  const totalActivities = Array.from(activityDates.values()).reduce(
    (sum, count) => sum + count,
    0
  );

  return totalDays === 0 ? 0 : Number((totalActivities / totalDays).toFixed(1));
};

export const calculateCompletionRate = (habits: Habit[]) => {
  if (!habits || habits.length === 0) return 0;

  const today = dayjs().startOf("day");

  const completedHabits = habits.filter((habit) =>
    habit.activities.some((activity) => {
      const activityDate = dayjs(Number(activity.date));
      return activityDate.isSame(today, "day");
    })
  );

  return Math.round((completedHabits.length / habits.length) * 100);
};

export const calculateStreakCompletion = (habits: Habit[]) => {
  if (!habits || habits.length === 0) return 0;

  const totalWeeklyTarget = habits.reduce(
    (sum, habit) => sum + (habit.weeklyTarget || 0),
    0
  );
  if (totalWeeklyTarget === 0) return 0;

  const today = dayjs();
  const weekStart = today.startOf("week");
  const weekEnd = today.endOf("week");

  const completedThisWeek = habits.reduce((sum, habit) => {
    const thisWeekActivities = habit.activities.filter((activity) => {
      const activityDate = dayjs(Number(activity.date));
      return (
        activityDate.isSameOrAfter(weekStart) &&
        activityDate.isSameOrBefore(weekEnd)
      );
    });
    return sum + thisWeekActivities.length;
  }, 0);

  return Math.round((completedThisWeek / totalWeeklyTarget) * 100);
};
