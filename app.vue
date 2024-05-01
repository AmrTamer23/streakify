<script lang="ts" setup>
// import { useHead } from "";
import NavBar from "./components/NavBar.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import "./assets/app.css";

// useHead({
//   titleTemplate: (titleChunk) => {
//     return titleChunk ? `${titleChunk} - Streakify` : "Streakify";
//   },
// });
</script>

<template>
  <main class="p-6 flex flex-col h-screen">
    <NavBar class="flex-grow-0" />
    <NuxtPage class="pt-6 flex-grow" />
  </main>
  <Toaster />
</template>
