<script lang="ts" setup>
import NavBar from "./components/NavBar.vue";
import "./assets/app.css";
</script>

<template>
  <main class="p-6 flex flex-col h-screen">
    <NavBar class="flex-grow-0" />
    <NuxtPage class="pt-6 flex-grow" />
  </main>
</template>
