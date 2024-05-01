<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
const isNavOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);
</script>

<template>
  <nav class="flex justify-between items-center">
    <NuxtLink to="/">
      <span
        class="font-semibold font-pt-mono text-3xl text-[#FFC278] pointer-events-none select-none"
      >
        Streakify
      </span>
    </NuxtLink>
    <ul class="flex items-center gap-2 max-md:hidden">
      <li>
        <NuxtLink to="/register">
          <Button
            size="lg"
            variant="default"
            class="bg-amber-500 text-neutral-800 font-semibold hover:bg-amber-600 text-lg border-0"
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
            class="font-semibold text-lg"
            aria-label="Login"
            >Login</Button
          >
        </NuxtLink>
      </li>
    </ul>
    <div class="lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button class="border-0 w-14" @click="toggleNav()">
            <Icon
              name="streamline:interface-setting-menu-2-button-parallel-horizontal-lines-menu-navigation-staggered-three-hamburger"
              size="1.3rem"
              v-if="!isNavOpen"
            >
            </Icon>
            <span v-else class="text-[1.3rem]"> X </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="bg-background mr-6 min-w-0 w-52 border-amber-500 p-0"
          @close-auto-focus="toggleNav()"
        >
          <DropdownMenuItem class="p-0">
            <Button
              class="border-0 w-full py-6 rounded-none text-start group/loginBtnMobile"
            >
              <NuxtLink
                class="text-lg text-white w-full group-active/loginBtnMobile:text-black"
                to="/login"
                >Login</NuxtLink
              >
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator
            class="bg-amber-500/50 my-0"
          ></DropdownMenuSeparator>
          <DropdownMenuItem class="p-0">
            <Button
              class="border-0 w-full py-6 rounded-none text-start group/signUpBtnMobile"
            >
              <NuxtLink
                class="text-lg text-white w-full group-active/signUpBtnMobile:text-black"
                to="/signup"
                >Sign Up</NuxtLink
              >
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
