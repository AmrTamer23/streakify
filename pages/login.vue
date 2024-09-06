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
      <div>
        <p>
          Don't have an account?
          <NuxtLink to="/register" class="hover:text-amber-500"
            >Sign up</NuxtLink
          >
        </p>
      </div>
      <div class="flex items-center w-full">
        <Separator class="flex-1 h-[0.05rem]" />
        <span class="flex-0 px-2 text-lg italic font-thin"> OR </span>
        <Separator class="flex-1 h-[0.05rem]" />
      </div>
      <div class="flex gap-2 w-full max-sm:flex-col max-sm:gap-4">
        <Button class="flex-grow flex justify-center items-end gap-2">
          <Icon
            name="logos:google-icon"
            size="1.5rem"
            class="[&_path]:stroke-black"
          ></Icon>
          <span> Continue with Google </span>
        </Button>
        <Button
          class="flex-grow flex justify-center items-end gap-2 group/btnGithub"
        >
          <Icon
            name="logos:github-icon"
            size="1.6rem"
            class="[&_path]:fill-white group-hover/btnGithub:[&_path]:fill-[#333]"
          ></Icon>
          <span> Continue with GitHub </span>
        </Button>
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
