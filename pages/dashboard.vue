<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import AddNewHabit from "~/components/AddNewHabit.vue";
import Habit from "~/components/Habit.vue";
import { useHabits } from "~/composables/useHabits";
//@ts-ignore
const supabase = await useSupabaseUser();

const { data, pending, error, refresh } = await useAsyncData("userData", () =>
  $fetch(`/api/user?${supabase.value.id}`)
);
const habits = await useHabits(supabase.value.id);
</script>

<template>
  <div
    class="text-xl text-neutral-400 pt-8 pb-4 justify-between lg:items-center flex flex-col lg:flex-row gap-4"
  >
    <div>Hello, {{ (data as unknown as User)?.name ?? "REAL....." }}</div>
    <div>
      <AddNewHabit />
    </div>
  </div>
  <main class="grid lg:grid-cols-4 lg:grid-rows-4 gap-y-4 lg:gap-x-4">
    <Habit v-for="habit in habits" :key="habit.id" :habit="habit" />
  </main>
</template>
