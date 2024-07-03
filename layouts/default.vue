<template>
  <header class="pt-8 px-8">
    <NavBar class="flex-grow-0" :logout="logout" :is-authed="isAuth" />
  </header>
  <main class="pb-8 px-8">
    <slot />
  </main>
</template>

<script lang="ts" setup>
const client = useSupabaseClient();
const { isAuth, logout: isAuthLogout } = useIsAuth();
const logout = async () => {
  isAuthLogout();
  await client.auth.signOut();
};
</script>

<style></style>
