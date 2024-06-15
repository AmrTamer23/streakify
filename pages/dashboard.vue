<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { Button } from "~/components/ui/button";
import HabitCard from "~/components/HabitCard.vue";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ref } from "vue";

//@ts-ignore
const supabase = await useSupabaseUser();

const { data, pending, error, refresh } = await useAsyncData("userData", () =>
  $fetch(`/api/user?${supabase.value.id}`)
);

const newHabit = ref<Habit>();
</script>

<template>
  <div
    class="text-xl text-neutral-400 pt-8 pb-4 justify-between items-center flex"
  >
    <div>Hello, {{ (data as unknown as User)?.name ?? "REAL....." }}</div>
    <div>
      <Sheet>
        <SheetTrigger as-child>
          <Button class="text-lg font-semibold gap-2">
            <span
              className="icon-[ph--plus-bold]"
              role="img"
              aria-hidden="true"
            ></span>
            <span> Create Habit </span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle class="text-zinc-200"> Create a new habit </SheetTitle>
            <SheetDescription class="text-zinc-300">
              Fill in the details below to create a new habit.
            </SheetDescription>
          </SheetHeader>
          <div class="grid gap-4 py-4">
            <div class="flex flex-col gap-2 items-start">
              <Label for="title" class="text-right"> Title </Label>
              <Input id="title" :value="newHabit?.title" class="col-span-3" />
            </div>
            <div class="flex flex-col gap-2 items-start">
              <Label for="icon" class="text-right"> Icon </Label>
              <Input id="icon" :value="newHabit?.icon" class="col-span-3" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose as-child>
              <Button type="submit"> Save changes </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  </div>
  <main class="grid lg:grid-cols-4 lg:grid-rows-4 gap-y-4 lg:gap-x-4">
    <HabitCard
      :habit="{
        id: 0,
        title: 'Read a book',
        icon: '📚',
        currStreak: 10,
        activity: [],
        longestStreak: 10,
      }"
    />
    <HabitCard
      :habit="{
        id: 0,
        title: 'Play the guitar',
        icon: '🎸',
        currStreak: 8,
        activity: [],
        longestStreak: 12,
      }"
    />
  </main>
</template>
