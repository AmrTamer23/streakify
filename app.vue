<script lang="ts" setup>
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <main class="flex h-screen flex-col">
    <NavBar />
    <section
      class="flex flex-1 flex-col justify-center gap-8 font-semibold text-neutral-600 *:mx-auto *:text-center"
    >
      <h3>Want To Build A Streak? <br /></h3>
      <div class="text-center text-3xl italic">Presenting <br /></div>
      <div class="text-center font-['Coco'] text-7xl">Streakify</div>
      <p class="text-lg">
        Streakify is a habit tracking app that helps you build streaks for your
        habits. It's simple, easy to use, and free.
      </p>
      <div class="flex flex-col gap-4">
        <a
          href="#"
          class="rounded-lg bg-emerald-600 px-4 py-2 text-xl text-teal-50"
        >
          Get Started
        </a>
        <a
          href="
        #"
        >
          Or Login
        </a>
      </div>
    </section>
    <section class="mx-auto p-2">
      <p>Spicy Footer</p>
    </section>
  </main>
</template>
