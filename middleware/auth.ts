import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  //@ts-ignore
  const user = await useSupabaseUser();
  if (
    !user?.value &&
    to.path !== "/register" &&
    to.path !== "/login" &&
    to.path !== "/"
  ) {
    return navigateTo("/login");
  }
  if (
    user?.value &&
    (to.path === "/login" || to.path === "/signup" || to.path === "/")
  ) {
    return navigateTo("/dashboard");
  }
});
