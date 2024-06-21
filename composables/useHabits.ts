import { useAsyncData, useState } from "nuxt/app";

export const useHabits = async (userId: string) => {
  const habits = useState<Habit[]>("habits");

  const {
    data: habitsData,
    pending: habitsPending,
    error: habitsError,
    refresh: habitsRefresh,
  } = await useAsyncData("habitsData", () => $fetch(`/api/habits?${userId}`));

  habits.value = habitsData as unknown as Habit[];
  return habits.value;
};
