<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
import { Input } from "@/components/ui/input/index";
import { Button } from "@/components/ui/button/index";
import { useToast } from "@/components/ui/toast/use-toast";
import { Toaster } from "@/components/ui/toast";
import { useRouter, useState } from "nuxt/app";

const client = useSupabaseClient();
const username = useState<string>("username");
const name = useState<string>("name");
const email = useState<string>("email");
const password = useState<string>("password");
const errMsg = useState<string>("errMsg");

const router = useRouter();
const { toast } = useToast();
const { user } = useAuth();

async function signUp() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (!error) {
      await $fetch("/api/user", {
        body: JSON.stringify({
          id: data?.user?.id,
          username: username.value,
          name: name.value,
          email: email.value,
        }),
        method: "POST",
      })
        .then(() => {
          router.push("/login");
          toast({
            title: "Success",
            description: "Account created successfully",
            variant: "default",
          });
        })
        .catch((err) => {
          console.error(err);
        });
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
  <main
    class="flex flex-col gap-4 *:max-w-lg mx-8 lg:*:mx-auto justify-center items-center h-full flex-1"
  >
    <div v-if="!user">
      <div>
        <h1 class="text-4xl font-semibold text-center w-full mb-4">
          Welcome <span class="text-amber-500">!</span>
        </h1>
      </div>
      <form @submit.prevent="signUp" class="flex flex-col gap-6">
        <div
          class="flex gap-6 lg:gap-4 items-center flex-col lg:flex-row w-full"
        >
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
      <div class="mt-6 mb-3 w-full flex justify-center items-center">
        <p>
          Have an account?
          <NuxtLink
            to="/login"
            class="hover:text-amber-500 underline underline-offset-8"
            >Login</NuxtLink
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
