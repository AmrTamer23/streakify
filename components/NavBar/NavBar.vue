<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DropdownMenu from "../ui/dropdown-menu/DropdownMenu.vue";
import { useRouter } from "vue-router";
const isNavOpen = ref(false);
const toggleNav = () => (isNavOpen.value = !isNavOpen.value);

const { signOut, user } = useAuth();
const router = useRouter();
</script>

<template>
  <nav class="flex justify-between items-center w-3/4 mx-auto">
    <NuxtLink to="/" class="w-fit p-0">
      <span
        class="font-semibold font-pt-mono text-4xl text-brand pointer-events-none select-none"
      >
        Streakify
      </span>
    </NuxtLink>
    <ul class="flex items-center gap-2 max-md:hidden" v-if="!user">
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
    <div class="lg:hidden" v-if="!user">
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
                to="/register"
                >Sign Up</NuxtLink
              >
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <DropdownMenu v-if="user">
      <DropdownMenuTrigger class="flex">
        <Avatar class="h-12 w-12 border-[#FFC278] border-2">
          <AvatarImage
            src="https://github.com/radix-vue.png"
            alt="@radix-vue"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        class="bg-background mr-6 min-w-0 w-52 border-amber-500 p-0 text-neutral-100 gap-0"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem class="-mt-1 rounded-none">Profile</DropdownMenuItem>
        <DropdownMenuItem class="rounded-none">Billing</DropdownMenuItem>
        <DropdownMenuItem class="rounded-none">Team</DropdownMenuItem>
        <DropdownMenuItem class="-mb-1 rounded-none"
          >Subscription</DropdownMenuItem
        >
        <DropdownMenuSeparator />
        <DropdownMenuItem
          @click="signOut().then(() => router.push('/login'))"
          class="bg-red-800 flex justify-between -mt-1 rounded-none"
        >
          <span> Logout </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </nav>
</template>
