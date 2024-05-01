import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async () => {
  //@ts-ignore
  const user = await useSupabaseUser();
  if (!user.value) {
    return navigateTo("/login");
  }
  if (user.value) {
    console.log("User is logged in");
    return navigateTo("/dashboard");
  }
});
