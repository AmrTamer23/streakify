<script lang="ts" setup>
import { ref } from "vue";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
// import { Label } from "~/components/ui/label";
// import { Input } from "~/components/ui/input";

import Separator from "./ui/separator/Separator.vue";
import HabitActivityAreaGraph from "./HabitActivityGraph.vue";

// Reuse `form` section
const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");

const isOpen = ref(false);

defineProps({
  habit: {
    type: Object as () => Habit,
    required: true,
  },
});
</script>

<template>
  <UseTemplate>
    <section class="flex flex-col gap-2 px-4">
      <div class="flex flex-col gap-1">
        <div class="[&_svg]:!h-10 [&_svg]:!w-10" v-html="habit.icon"></div>
        <div class="text-zinc-100 text-xl">{{ habit.title }}</div>
      </div>

      <Separator class="mt-2" />
      <HabitActivityAreaGraph
        :activities="habit.activities"
        class="overflow-x-auto"
      />
      <Separator />
      <div class="flex gap-2 items-center">
        <span> Longest Streak: </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m43.5 15.13l-1.733 8.534M4.5 32.87l11.768-11.768l10.63 10.63l15.016-15.016L43.5 15.13l-8.44 1.6"
          />
        </svg>
        <span>{{ habit.longestStreak }} days</span>
      </div>
      <Button
        class="font-semibold bg-amber-500 text-neutral-900 flex items-center justify-center gap-2"
      >
        <span
          className="icon-[ic--round-done-outline] h-5 w-5"
          role="img"
          aria-hidden="true"
        />
        <span> Mark as done today </span>
      </Button>
    </section>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <HabitCard :habit="habit" />
    </DialogTrigger>
    <DialogContent class="max-w-4xl">
      <GridForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <HabitCard :habit="habit" />
    </DrawerTrigger>
    <DrawerContent>
      <GridForm />
      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline"> Cancel </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
