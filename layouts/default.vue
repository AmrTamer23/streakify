<template>
  <div class="flex flex-col min-h-screen">
    <header class="pt-6 z-10 relative *:mx-auto pb-2 flex-0">
      <NavBar class="flex-grow-0" />
    </header>

    <slot class="flex-1 items-center justify-center" />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
