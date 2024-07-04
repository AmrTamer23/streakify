<template>
  <div>
    <div
      class="border-[0.5px] border-white/70 relative shadow-[3px_3px_0px_0px_rgb(255,194,120)] p-4"
    >
      <div class="text-left">
        <h3 class="text-lg font-bold mb-1 text-gray-100">
          {{ cardContent.title }}
        </h3>
        <p class="text-gray-300">
          {{ cardContent.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  cardContent: {
    title: string;
    description: string;
  };
  class?: string;
}>();
</script>

<style></style>
