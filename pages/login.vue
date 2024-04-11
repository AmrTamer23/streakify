<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const handleSubmit = (e: Event) => {
  e.preventDefault();
  console.log("Form submitted");
};
</script>

<template>
  <main class="*:mx-auto flex flex-col gap-4 *:max-w-lg h-full justify-center">
    <div>
      <h1 class="text-4xl font-semibold">
        Welcome Back <span class="text-amber-500"> ! </span>
      </h1>
    </div>
    <form :onsubmit="handleSubmit" class="flex flex-col gap-6">
      <fieldset>
        <label for="email" class="sr-only"> Email </label>
        <Input name="email" type="email" placeholder="Email" />
      </fieldset>
      <fieldset>
        <label for="password" class="sr-only"> Password </label>
        <Input name="password" type="password" placeholder="Password" />
      </fieldset>
      <Button type="submit" size="lg" class="w-full text-lg font-semibold"
        >Login</Button
      >
    </form>
    <div>
      <p>
        Don't have an account?
        <NuxtLink to="/signup" class="hover:text-amber-500">Sign up</NuxtLink>
      </p>
    </div>
    <div class="text-lg italic font-thin">OR</div>
    <div class="flex gap-2 w-full">
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
        <span> Continue with Github </span>
      </Button>
    </div>
  </main>
</template>

<style>
fieldset,
form {
  width: 100%;
}
</style>
