<script setup lang="ts">
import { useHabits } from "~/composables/useHabits";
import { useAsyncData } from "nuxt/app";
import AddNewHabit from "~/components/AddNewHabit/AddNewHabit.vue";
import Habit from "~/components/Habit/Habit.vue";
//@ts-ignore
const supabase = useSupabaseUser();

const { user } = await useUser();
const { fetchHabits, habits } = useHabits();

onMounted(() => {
  fetchHabits();
});
</script>

<template>
  <div
    class="text-xl text-neutral-400 pt-8 pb-4 justify-between lg:items-center flex flex-col lg:flex-row gap-4 *:mx-auto"
  >
    <div class="text-3xl">Hello, {{ user.name }}</div>
    <div>
      <AddNewHabit />
    </div>
  </div>
  <main class="grid lg:grid-cols-4 lg:grid-rows-4 gap-y-4 lg:gap-x-4">
    <Habit v-for="habit in habits" :key="habit.id" :habit="habit" />
  </main>
</template>
