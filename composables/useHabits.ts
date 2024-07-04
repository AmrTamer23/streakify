// composables/useHabit.js
import { ref } from "vue";

export const useHabits = () => {
  const habits = ref<Habit[]>([]);
  const isLoading = ref(false);
  const error = ref(null);

  const { user } = useAuth();

  const fetchHabits = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      await useAsyncData("habitsData", async () => {
        return await $fetch(`/api/habits?${user.value?.id}`).then((data) => {
          habits.value = data as Habit[];
          console.log("data");
        });
      });
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const createHabit = async (icon: string, title: string) => {
    await useAsyncData("HabitsData", () =>
      $fetch(`/api/habit`, {
        method: "POST",
        body: {
          icon: icon,
          title: title,
          userId: user.value?.id,
        },
      })
    );
  };

  // const updateHabit = async (id, habitData) => {
  //   isLoading.value = true
  //   error.value = null
  //   try {
  //     const response = await fetch(`/api/habits/${id}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(habitData)
  //     })
  //     const updatedHabit = await response.json()
  //     const index = habits.value.findIndex(h => h.id === id)
  //     if (index !== -1) habits.value[index] = updatedHabit
  //   } catch (err) {
  //     error.value = 'Failed to update habit'
  //     console.error(err)
  //   } finally {
  //     isLoading.value = false
  //   }
  // }

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
    // updateHabit,
    deleteHabit,
  };
};
