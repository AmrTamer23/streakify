<script setup lang="ts">
import neuCard from "@/components/ui/neubrutalism-card/neubrutalism-card.vue";
definePageMeta({
  middleware: ["auth"],
});

const state = useState<boolean>("state");

const features = ref([
  {
    title: "Track your habits",
    description:
      "Streakify helps you track your habits and visualize your progress.",
  },
  {
    title: "Stay motivated",
    description:
      "Streakify motivates you to keep going by showing your streaks.",
  },
  {
    title: "Build good habits",
    description:
      "Streakify helps you build good habits by tracking your progress.",
  },
  {
    title: "Break bad habits",
    description:
      "Streakify helps you break bad habits by tracking your progress.",
  },
]);
</script>

<template>
  <main class="*:mx-auto relative z-10">
    <div class="w-full mt-28 flex flex-col gap-8 relative">
      <h1 class="text-4xl font-semibold text-center w-full">
        Welcome to
        <span class="text-amber-500 font-pt-mono text-5xl">Streakify</span>
      </h1>
      <p class="w-full text-center text-2xl text-neutral-300">
        A habit tracking app that helps you build good habits and break bad
        ones.
      </p>
      <div class="w-full flex flex-col gap-8">
        <div class="grid grid-cols-2 gap-8 mx-auto">
          <neuCard
            v-for="feature in features"
            :key="feature.title"
            :cardContent="feature"
          />
        </div>
      </div>
      <div class="flex gap-4 mx-auto">
        <a
          href="https://github.com/AmrTamer23/streakify"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button
            class="text-xl px-4 py-6 items-center bg-transparent gap-2 group/gh hover:bg-amber-600"
          >
            <span
              class="icon-[bi--github] text-neutral-100 h-7 w-7 group-hover/gh:text-neutral-950"
              role="img"
              aria-hidden="true"
            />
            <span> Star on GitHub </span>
          </Button></a
        >
        <NuxtLink to="/login">
          <Button
            class="text-xl px-4 py-6 bg-amber-600 text-neutral-950 items-center gap-1"
          >
            <span> Get Started </span>
            <span
              class="icon-[material-symbols--arrow-outward] h-6 w-6 text-neutral-950"
              role="img"
              aria-hidden="true"
            /> </Button
        ></NuxtLink>
      </div>
    </div>
  </main>
</template>
