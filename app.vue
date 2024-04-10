<script lang="ts" setup>
import NavBar from "./components/NavBar.vue";
import "./assets/app.css";
</script>

<template>
  <main class="p-6">
    <NavBar />
    <div class="pt-6">
      <NuxtPage />
    </div>
  </main>
</template>
