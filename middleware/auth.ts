import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  //@ts-ignore
  const user = await useSupabaseUser();
  console.log("User", user.value);
  if (!user?.value && to.path !== "/register" && to.path !== "/login") {
    console.log("User is not logged in");
    console.log(to, from);
    return navigateTo("/login");
  }
  if (user?.value && (to.path === "/login" || to.path === "/signup")) {
    console.log("User is logged in");
    return navigateTo("/dashboard");
  }
});
