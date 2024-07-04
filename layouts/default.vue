<template>
  <div
    class="h-screen w-full absolute top-0 left-0 z-0"
    :style="{
      background:
        'linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)',
    }"
  ></div>
  <header class="pt-8 z-10 relative *:mx-auto">
    <NavBar class="flex-grow-0" />
  </header>
  <main class="pb-8 relative z-10">
    <slot />
  </main>
</template>

<script lang="ts" setup></script>

<style></style>
