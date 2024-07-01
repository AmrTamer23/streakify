<script setup lang="ts">
import { computed } from "vue";

const { activities } = defineProps({
  activities: {
    type: Object as () => Activity[],
    required: true,
  },
});

console.log(activities);

const squares = computed(() => {
  const result = [];
  for (var i = 1; i < 365; i++) {
    if (activities.find((activity) => activity.x === i)) {
      console.log("found");
      result.push(`<li data-level="3"></li>`);
    } else {
      result.push(`<li data-level="0"></li>`);
    }
  }
  return result.join("");
});

console.log(squares.value); // This will now log the generated HTML after computation
</script>

<template>
  <div class="graph">
    <ul class="squares" v-html="squares"></ul>
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
