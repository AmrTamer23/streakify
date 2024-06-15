<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import HabitCard from "~/components/HabitCard.vue";

//@ts-ignore
const supabase = await useSupabaseUser();

const { data, pending, error, refresh } = await useAsyncData("userData", () =>
  $fetch(`/api/user?${supabase.value.id}`)
);
</script>

<template>
  <div class="text-xl text-neutral-400 pt-8 pb-4">
    Hello, {{ (data as unknown as User)?.name ?? "REAL....." }}
  </div>
  <main class="grid lg:grid-cols-4 lg:grid-rows-4 gap-y-4 lg:gap-x-4">
    <HabitCard
      :habit="{
        id: 0,
        title: 'Read a book',
        icon: '📚',
        currStreak: 10,
        activity: [],
        longestStreak: 10,
      }"
    />
    <HabitCard
      :habit="{
        id: 0,
        title: 'Play the guitar',
        icon: '🎸',
        currStreak: 8,
        activity: [],
        longestStreak: 12,
      }"
    />
  </main>
</template>
