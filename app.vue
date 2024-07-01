<script lang="ts" setup>
import "@fontsource/geist-sans";
import NavBar from "~/components/NavBar/NavBar.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
import "./assets/app.css";

//@ts-ignore
definePageMeta({
  title: "Streakify",
});
</script>

<template>
  <main class="p-6 flex flex-col h-screen">
    <NavBar class="flex-grow-0" />
    <NuxtPage class="pt-6 flex-grow" />
  </main>
  <Toaster />
</template>
