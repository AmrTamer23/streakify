<script lang="ts" setup>
import "@fontsource/geist-sans";
import Toaster from "@/components/ui/toast/Toaster.vue";
import "./assets/app.css";

definePageMeta({
  title: "Habit Tracker",
  description: "Track your habits and improve your life.",
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
