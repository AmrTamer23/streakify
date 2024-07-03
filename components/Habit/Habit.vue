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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Separator from "../ui/separator/Separator.vue";
import HabitActivityAreaGraph from "../HabitActivityGraph/HabitActivityGraph.vue";

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
    <section class="flex flex-col gap-2 p-4">
      <div
        class="flex lg:items-end justify-between mt-2 flex-col lg:flex-row gap-2 lg:gap-0"
      >
        <div class="flex flex-col gap-1">
          <div class="[&_svg]:!h-20 [&_svg]:!w-20" v-html="habit.icon"></div>
          <div class="text-zinc-100 text-xl">{{ habit.title }}</div>
          <div class="flex items-center gap-1 mt-2">
            <span
              class="icon-[hugeicons--time-quarter-pass] h-7 w-7 text-amber-400/50"
              role="img"
              aria-hidden="true"
            />
            <span> Started from: </span>
            <span>{{ habit.longestStreak }} days</span>
          </div>
        </div>
        <div class="flex gap-2 flex-col items-end">
          <DropdownMenu>
            <DropdownMenuTrigger class="w-fit">
              <Button variant="ghost" class="px-1">
                <span
                  class="icon-[gg--more-vertical] h-6 w-6"
                  role="img"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="bg-zinc-900">
              <DropdownMenuItem
                class="bg-red-700 text-zinc-200 hover:!bg-red-950"
              >
                <DropdownMenuLabel> Delete </DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div class="flex gap-1 items-center">
            <span
              class="icon-[ant-design--stock-outlined] h-8 w-8 text-amber-400"
              role="img"
              aria-hidden="true"
            />
            <span> Longest Streak: </span>
            <span>{{ habit.longestStreak }} days</span>
          </div>
        </div>
      </div>
      <Separator class="mt-2" />
      <HabitActivityAreaGraph
        :activities="habit.activities"
        class="overflow-x-auto max-w-full"
      />
      <Separator />
      <div class="flex items-center justify-center">
        <Button
          class="font-semibold bg-amber-500 text-neutral-900 flex items-center justify-center gap-2 lg:w-1/2 lg:mx-auto text-lg mt-4"
        >
          <span
            className="icon-[ic--round-done-outline] h-7 w-7"
            role="img"
            aria-hidden="true"
          />
          <span> Done for Today </span>
        </Button>
      </div>
    </section>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <HabitCard :habit="habit" />
    </DialogTrigger>
    <DialogContent class="max-w-fit p-4">
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
