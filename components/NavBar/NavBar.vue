<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
const isNavOpen = ref(false);

const { signOut, user } = useAuth();
const router = useRouter();

const handleSignOut = async () => {
  await signOut();
  router.push("/");
};
</script>

<template>
  <nav class="flex justify-between items-center px-4">
    <NuxtLink to="/" class="w-fit p-0">
      <span
        class="font-semibold font-pt-mono text-4xl text-brand pointer-events-none select-none"
      >
        Streakify
      </span>
    </NuxtLink>
    <ul class="flex items-center gap-2" v-if="!user">
      <li class="max-sm:hidden">
        <NuxtLink to="/register">
          <Button
            size="lg"
            variant="default"
            class="bg-amber-500 text-neutral-800 font-semibold hover:bg-amber-600 ~text-base/lg border-0"
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
            class="font-semibold max-sm:py-0 ~text-base/lg"
            aria-label="Login"
            >Login</Button
          >
        </NuxtLink>
      </li>
    </ul>
    <ul class="flex items-center gap-2" v-else>
      <li>
        <Button
          size="lg"
          variant="ghost"
          class="font-semibold ~text-base/lg hover:bg-red-700 hover:text-white max-sm:py-0"
          aria-label="Logout"
          @click="handleSignOut"
          >Logout</Button
        >
      </li>
    </ul>
  </nav>
</template>
