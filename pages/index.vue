<script setup lang="ts">
//@ts-ignore
definePageMeta({
  middleware: ["auth"],
});

const state = useState<boolean>("state");
</script>

<template>
  <main class="*:mx-auto">
    <div className="relative w-full flex flex-col ">
      <img
        className="absolute top-0 z-0 -translate-y-1/2 h-fit"
        src="https://farmui.vercel.app/bg-back.png"
        width="{1000}"
        height="{1000}"
        alt="back bg"
      />
    </div>
    <div class="w-full mt-28 flex flex-col gap-8">
      <h1 class="text-4xl font-semibold text-center w-full">
        Welcome to
        <span class="text-amber-500 font-pt-mono text-5xl">Streakify</span>
      </h1>
      <p class="w-full text-center text-2xl">
        A habit tracking app that helps you build good habits and break bad
        ones.
      </p>
    </div>
  </main>
</template>
