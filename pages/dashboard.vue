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
  <div class="text-xl text-neutral-400 py-4">
    Hello, {{ (data as unknown as User).name }}
  </div>
  <main class="grid grid-cols-4 grid-rows-4"></main>
</template>
