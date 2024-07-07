<script setup lang="ts">
import { onMounted, watch } from "vue";

const { user } = await useUser();
const { fetchHabits, habits } = useHabits();

onMounted(async () => {
  await fetchHabits();
});

watch(
  () => user,
  async (newUser) => {
    if (newUser) {
      await fetchHabits();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="text-xl text-neutral-400 pt-8 pb-4 justify-between lg:items-center flex flex-col lg:flex-row gap-4 lg:w-3/4 mx-auto"
  >
    <div class="text-3xl text-neutral-100">Hello, {{ user.name }}</div>
    <AddNewHabit />
  </div>
  <Separator class="lg:w-3/4 mx-auto my-4 bg-neutral-600" />
  <div
    class="grid lg:grid-cols-3 gap-y-4 lg:gap-x-4 lg:w-3/4 mx-auto overflow-y-hidden"
  >
    <Habit v-for="habit in habits" :key="habit.id" :habit="habit" />
  </div>
</template>
