<script setup lang="ts">
//@ts-ignore
definePageMeta({
  middleware: ["auth"],
});
import { Input } from "@/components/ui/input/index";
import { Button } from "@/components/ui/button/index";
import { Separator } from "@/components/ui/separator/index";
import { useToast } from "@/components/ui/toast/use-toast";
import { Toaster } from "@/components/ui/toast";
import { useRouter, useState } from "nuxt/app";
//@ts-ignore
const client = useSupabaseClient();
const username = useState<string>("username");
const name = useState<string>("name");
const email = useState<string>("email");
const password = useState<string>("password");
const errMsg = useState<string>("errMsg");

const router = useRouter();
const { toast } = useToast();

async function signUp() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (data) {
      //@ts-ignore
      const res = await $fetch("/api/user", {
        body: JSON.stringify({
          username: username.value,
          name: name.value,
          email: email.value,
        }),
        method: "POST",
      });
      router.push("/login");
    }

    if (error) throw error;
  } catch (error) {
    errMsg.value = (error as Error).message;
    console.error(errMsg.value);
    toast({
      title: "Error",
      description: errMsg.value,
      variant: "destructive",
    });
  }
}
</script>

<template>
  <main class="*:mx-auto flex flex-col gap-4 *:max-w-lg h-full justify-center">
    <div>
      <h1 class="text-4xl font-semibold">
        Welcome <span class="text-amber-500">!</span>
      </h1>
    </div>
    <form @submit.prevent="signUp" class="flex flex-col gap-6">
      <div class="flex gap-4 items-center">
        <fieldset>
          <label for="name" class="sr-only"> Name </label>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            class="invalid:border-red-700 focus:border-amber-500"
            v-model="name"
          />
        </fieldset>
        <fieldset>
          <label for="username" class="sr-only"> Username </label>
          <Input
            name="username"
            type="text"
            placeholder="username"
            class="invalid:border-red-700 focus:border-amber-500"
            v-model="username"
          />
        </fieldset>
      </div>
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
        >Register</Button
      >
    </form>
    <div>
      <p>
        Have an account?
        <NuxtLink to="/login" class="hover:text-amber-500">Login</NuxtLink>
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
  </main>
  <Toaster />
</template>
