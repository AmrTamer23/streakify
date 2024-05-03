<script setup lang="ts">
//@ts-ignore
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <main class="*:mx-auto">
    <h1 class="text-3xl font-semibold">Welcome to Streakify</h1>
    <p>Spicy landing page</p>
  </main>
</template>
