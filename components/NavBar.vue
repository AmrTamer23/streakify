<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <nav class="flex justify-between items-center">
    <NuxtLink to="/">
      <span
        class="font-semibold font-pt-mono text-3xl text-[#FFC278] pointer-events-none select-none"
      >
        Streakify
      </span>
    </NuxtLink>
    <ul class="flex items-center gap-2">
      <li>
        <NuxtLink to="/signup">
          <Button
            size="lg"
            variant="default"
            class="bg-amber-500 text-neutral-800 font-semibold hover:bg-amber-600 text-lg border-0"
            aria-label="Sign Up"
            >Sign Up</Button
          >
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/login">
          <Button
            size="lg"
            variant="ghost"
            class="font-semibold text-lg"
            aria-label="Login"
            >Login</Button
          >
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
