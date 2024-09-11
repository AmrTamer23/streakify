// composables/useHabit.js
import { ref } from "vue";

export const useHabits = () => {
  const habits = useState<Habit[]>("habits");
  const isLoading = ref(false);
  const error = ref(null);

  const { user } = useAuth();

  const fetchHabits = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      await $fetch<Habit[]>(`/api/habits?userId=${user.value?.id}`).then(
        (data) => {
          habits.value = data;
          return data;
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createHabit = async (icon: string, title: string, target: number) => {
    // Create a temporary habit
    const tempHabit = {
      id: Date.now(), // temporary ID
      icon,
      title,
      activities: [],
      currStreak: 0,
      longestStreak: 0,
      weeklyTarget: target,
    };

    habits.value.push(tempHabit);

    try {
      const data = await $fetch("/api/habit", {
        method: "POST",
        body: {
          icon: icon,
          title: title,
          userId: user.value?.id,
          target: target,
        },
      });

      // Replace the temporary habit with the actual data from the server
      const index = habits.value.findIndex((h) => h.id === tempHabit.id);
      if (index !== -1) habits.value[index] = { ...data, activities: [] };
    } catch (err) {
      console.error(err);
      // Roll back the change if the request fails
      habits.value = habits.value.filter((h) => h.id !== tempHabit.id);
    }
  };

  const updateHabit = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    const habitData = {
      habitId: id,
      isDone: true,
    };

    try {
      const response = await $fetch(`/api/habit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: habitData,
      });
      fetchHabits();
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteHabit = async (id: number) => {
    isLoading.value = true;
    error.value = null;

    // Optimistically remove the habit from the list
    const oldHabits = [...habits.value];
    habits.value = habits.value.filter((h) => h.id !== id);

    try {
      await fetch("/api/habit", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habitId: id,
        }),
      });
    } catch (err) {
      console.error(err);
      // Roll back the change if the request fails
      habits.value = oldHabits;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    habits,
    isLoading,
    error,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
  };
};
