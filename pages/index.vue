<script setup lang="ts">
import neuCard from "@/components/ui/neubrutalism-card/neubrutalism-card.vue";
definePageMeta({
  middleware: ["auth"],
});

const features = [
  {
    title: "Track your habits",
    icon: '<svg width="2rem" height="2rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#eab308" d="M6.5 1q2.125 0 3.313 1.888T11 7q0 1.025-.213 1.95T10.3 10.6l-7.125 1.425Q2.8 11.3 2.4 10.013T2 7q0-2.575 1.275-4.288T6.5 1m1.375 17Q6.1 18 5.113 16.763T4 13.9l6.45-1.3q.2.425.375.963T11 14.675q0 1.425-.888 2.375T7.876 18M17.5 6q1.95 0 3.225 1.713T22 12q0 1.725-.4 3.013t-.775 2.012L13.7 15.6q-.275-.725-.487-1.65T13 12q0-2.225 1.188-4.112T17.5 6m-1.375 17q-1.35 0-2.238-.95T13 19.675q0-.575.175-1.112t.375-.963l6.425 1.3q-.125 1.625-1.1 2.863T16.125 23"/></svg>',
    description:
      "Streakify helps you track your habits and visualize your progress.",
  },
  {
    title: "Stay motivated",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 512 512"><path fill="#eab308" d="M439.6 0H204.9L55.4 256h149.5l-128 256l341.3-320H247.5z"/></svg>',
    description:
      "Streakify motivates you to keep going by showing your streaks.",
  },
  {
    title: "Build good habits",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24"><path fill="#eab308" fill-rule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M5.47 5.47a.75.75 0 0 1 1.06 0l.344.343a.75.75 0 0 1-1.061 1.06L5.47 6.53a.75.75 0 0 1 0-1.06m13.06 0a.75.75 0 0 1 0 1.06l-.343.344a.75.75 0 0 1-1.06-1.061l.343-.343a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m18 0a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75M6.873 17.127a.75.75 0 0 1 0 1.06l-.343.343a.75.75 0 0 1-1.06-1.06l.343-.343a.75.75 0 0 1 1.06 0m10.254 0a.75.75 0 0 1 1.06 0l.343.343a.75.75 0 1 1-1.06 1.06l-.343-.343a.75.75 0 0 1 0-1.06M12 19.25a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/><path fill="#eab308" d="M7 11.06c0 2.542 2.01 3.897 3.48 5.11c.52.427 1.02.83 1.52.83s1-.403 1.52-.83c1.47-1.213 3.48-2.568 3.48-5.11s-2.75-4.346-5-1.902c-2.25-2.444-5-.64-5 1.902"/></svg>',
    description:
      "Streakify helps you build good habits by tracking your progress.",
  },
  {
    title: "Break bad habits",
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 14 14"><path fill="#eab308" fill-rule="evenodd" d="M1.898 10.778A1 1 0 0 1 .483 9.363l3.333-3.332l.007-.007a1.457 1.457 0 0 1 2.039 0l.007.007L7.57 7.732L9.917 5.25l-1.04-1.04a.75.75 0 0 1 .53-1.28h3.652a.75.75 0 0 1 .75.75v3.652a.75.75 0 0 1-1.28.53l-1.197-1.198l-2.704 2.861a1.457 1.457 0 0 1-2.066.027l-.007-.007l-1.713-1.712z" clip-rule="evenodd"/></svg>',
    description:
      "Streakify helps you break bad habits by tracking your progress.",
  },
];
</script>

<template>
  <main class="*:mx-auto relative z-10">
    <div class="w-full ~mt-14/28 flex flex-col gap-8 relative">
      <h1
        class="text-4xl font-semibold text-center w-full flex flex-col gap-2 lg:flex-row justify-center items-center"
      >
        <span> Welcome to </span>
        <span class="text-amber-500 font-pt-mono text-5xl">Streakify</span>
      </h1>
      <p class="w-full text-center ~text-lg/2xl text-neutral-300">
        A habit tracking app that helps you build good habits and break bad
        ones.
      </p>
      <div class="w-full flex flex-col gap-8">
        <div class="grid lg:grid-cols-2 gap-8 mx-auto px-8">
          <neuCard
            v-for="feature in features"
            :key="feature.title"
            :cardContent="feature"
          />
        </div>
      </div>
      <div class="flex gap-4 mx-auto flex-col-reverse lg:flex-row max-sm:mb-8">
        <a
          href="https://github.com/AmrTamer23/streakify"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button
            class="~text-lg/xl px-4 py-6 items-center bg-transparent gap-2 group/gh hover:bg-amber-600"
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
            class="~text-lg/xl px-4 py-6 bg-brand text-neutral-950 items-center gap-1 w-full"
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
