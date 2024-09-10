<script setup lang="ts">
import { computed, watch, ref } from "vue";

interface Activity {
  x: number;
  // Add other properties if needed
}

const props = defineProps<{
  activities: Activity[];
}>();

const squares = ref<string[]>([]);

const updateSquares = () => {
  squares.value = Array.from({ length: 365 }, (_, i) => {
    const index = i + 1;
    if (props.activities.some((activity) => activity.x === index)) {
      return `<li data-level="3"></li>`;
    } else {
      return `<li data-level="0"></li>`;
    }
  });
};

watch(() => props.activities, updateSquares, { immediate: true, deep: true });

const squaresHtml = computed(() => squares.value.join(""));
</script>

<template>
  <div class="graph">
    <ul class="squares" v-html="squaresHtml"></ul>
  </div>
</template>
<style>
/* Article - https://bitsofco.de/github-contribution-graph-css-grid/ */

/* Grid-related CSS */

:root {
  --square-size: 1.5vh;
  --square-gap: 0.25rem;
  --week-width: calc(var(--square-size) + var(--square-gap));
}

.squares {
  grid-area: squares;
}

.graph {
  display: inline-grid;
  grid-template-areas: "squares";
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
}

.squares {
  display: grid;
  grid-gap: var(--square-gap);
  grid-template-rows: repeat(7, var(--square-size));
}

.squares {
  grid-auto-flow: column;
  grid-auto-columns: var(--square-size);
}

.squares li {
  background-color: #ebedf010;
  border-radius: 15%;
}

.squares li[data-level="3"] {
  @apply bg-emerald-800;
}
</style>
