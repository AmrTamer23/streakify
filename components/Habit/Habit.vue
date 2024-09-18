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
import { checkActivitiesForToday, calculateLongestStreak } from "~/lib/utils";
import dayjs from "dayjs";

const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery("(min-width: 768px)");

const isOpen = ref(false);

const props = defineProps({
  habit: {
    type: Object as () => Habit,
    required: true,
  },
});

const { deleteHabit, updateHabit } = useHabits();

const longestStreak = calculateLongestStreak(props.habit.activities);
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
          <div class="flex gap-1 items-center pt-2">
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-brand"
                d="m11 21l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4t-1.225-2.175T1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.538T11 5.075q.85-1 2.025-1.537T15.5 3q2.125 0 3.563 1.288T20.85 7.3q-.5-.2-1.05-.25T18.675 7q-2.125 0-3.9 1.713T13 13q0 1.2.525 2.438T15 17.45q-.475.425-1.237 1.088T12.45 19.7zm6.95-4.825L15.1 13.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4z"
              />
            </svg>
            <span> Longest Streak: </span>
            <span>{{ longestStreak }} days</span>
          </div>
          <div class="flex items-center gap-1 mt-2">
            <svg
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-brand"
                d="m12 8l-1.55 3.45L7 13l3.45 1.55L12 18l1.55-3.45L17 13l-3.45-1.55L12 8ZM9 3V1h6v2H9Zm3 19q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.85.713-3.488T5.65 6.65q1.225-1.225 2.863-1.938T12 4q1.55 0 2.975.5t2.675 1.45l1.4-1.4l1.4 1.4l-1.4 1.4Q20 8.6 20.5 10.025T21 13q0 1.85-.713 3.488T18.35 19.35q-1.225 1.225-2.863 1.938T12 22Z"
              />
            </svg>

            <span> Started from: </span>
            <span v-if="habit?.activities?.[0]?.date">{{
              dayjs(Number(habit.activities?.[0].date)).format("MMM D, YYYY")
            }}</span>
            <span v-else>N/A</span>
          </div>
        </div>
        <div class="flex gap-2 flex-col items-end">
          <DropdownMenu
            ><DropdownMenuTrigger class="w-fit">
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
                class="bg-red-700 text-zinc-200 hover:!bg-red-950 hover:text-neutral-100"
                @click="deleteHabit(habit.id)"
              >
                <DropdownMenuLabel> Delete </DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          @click="
            () => {
              updateHabit(habit.id);
              console.log('clicked', habit.id);
            }
          "
          :disabled="checkActivitiesForToday(habit.activities)"
        >
          <span
            class="icon-[ic--round-done-outline] h-7 w-7"
            role="img"
            aria-hidden="true"
          />
          <span v-if="!checkActivitiesForToday(habit.activities)">
            Mark Done for Today
          </span>
          <span v-if="checkActivitiesForToday(habit.activities)">
            Done for Today
          </span>
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
