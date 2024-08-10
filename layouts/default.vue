<template>
  <div class="h-screen w-full absolute top-0 left-0 z-0"></div>
  <header class="pt-14 z-10 relative *:mx-auto">
    <NavBar class="flex-grow-0" />
  </header>
  <main class="pb-8 relative z-10 *:overflow-hidden h-fit">
    <slot />
  </main>
</template>

<script lang="ts" setup></script>

<style></style>
