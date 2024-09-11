<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
import { Input } from "@/components/ui/input/index";
import { Button } from "@/components/ui/button/index";
import { Separator } from "@/components/ui/separator/index";
import { useRouter, useState } from "nuxt/app";
import { Toaster } from "~/components/ui/toast";
const email = useState<string>("email");
const password = useState<string>("password");
const errMsg = useState<string>("errMsg");

const router = useRouter();

const { signIn, user } = useAuth();
</script>

<template>
  <main class="*:mx-auto flex flex-col gap-4 *:max-w-lg mt-24">
    <div>
      <h1 class="text-4xl font-semibold">
        Welcome Back<span class="text-amber-500">!</span>
      </h1>
    </div>
    <div v-if="!user">
      <form
        @submit.prevent="
          signIn(email, password).then(() => router.push('/dashboard'))
        "
        class="flex flex-col gap-6"
      >
        <fieldset>
          <label for="email" class="sr-only"> Email </label>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            class="invalid:border-red-700 focus:border-amber-500"
            v-model="email"
          />
        </fieldset>
        <fieldset>
          <label for="password" class="sr-only"> Password </label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            class="invalid:border-red-700 focus:border-amber-500"
            v-model="password"
          />
        </fieldset>
        <Button type="submit" size="lg" class="w-full text-lg font-semibold"
          >Login</Button
        >
      </form>
      <div class="mt-6 mb-3 w-full flex justify-center items-center">
        <p>
          Don't have an account?
          <NuxtLink to="/register" class="hover:text-amber-500"
            >Sign up</NuxtLink
          >
        </p>
      </div>
    </div>
    <div v-else>
      <p>You are already logged in.</p>
      <NuxtLink to="/dashboard" class="text-amber-500 hover:underline"
        >Go to Dashboard</NuxtLink
      >
    </div>
  </main>
  <Toaster />
</template>

<style>
fieldset,
form {
  width: 100%;
}
</style>
