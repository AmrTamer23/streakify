<template>
  <div>
    <div
      class="border-[0.5px] border-white/70 relative shadow-[3px_3px_0px_0px_rgb(255,194,120)] p-4"
    >
      <div class="text-left">
        <h3
          class="text-lg font-bold mb-1 text-gray-100 flex gap-2"
        >
          <span v-html="cardContent.icon" class="[&_span]:h-6 [&_span]:w-6" </span>
          <span>
            {{ cardContent.title }}
          </span>
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
    icon: string;
  };
  class?: string;
}>();
</script>

<style></style>
