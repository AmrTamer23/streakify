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
          console.log(habits.value);
          return data;
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createHabit = async (icon: string, title: string) => {
    await $fetch(`/api/habit`, {
      method: "POST",
      body: {
        icon: icon,
        title: title,
        userId: user.value?.id,
      },
    }).then((data) => {
      habits.value.push({ ...data, activities: [] });
      console.log(habits.value);
      fetchHabits();
    });
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
    try {
      await $fetch(`/api/habits`, {
        // @ts-ignore
        method: "DELETE",
        body: {
          habitId: id,
        },
      });
      habits.value = habits.value.filter((h) => h.id !== id);
    } catch (err) {
      console.error(err);
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
