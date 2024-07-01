<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
defineProps({
  habit: {
    type: Object as () => Habit,
    required: true,
  },
});
</script>

<template>
  <Card
    class="bg-zinc-950 text-zinc-200 hover:border-brand cursor-pointer hover:bg-zinc-900 transition-all ease-in-out duration-200"
  >
    <CardHeader>
      <CardTitle class="flex items-center justify-between w-full">
        <div class="flex gap-2 flex-col">
          <span v-html="habit.icon" class="[&_svg]:h-10 [&_svg]:w-10"></span>
          <div class="text-lg text-zinc-100">{{ habit.title }}</div>
        </div>
        <div class="flex gap-2 items-center">
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
          <span>
            {{ habit.longestStreak }}
          </span>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-2">
      <div>Current Streak: {{ habit.currStreak }}</div>
      <div class="flex gap-1 flex-wrap">
        <span
          className="icon-[noto--green-square]"
          role="img"
          aria-hidden="true"
          v-for="(_, index) in habit.currStreak"
          :key="index"
        ></span>
      </div>
    </CardContent>
  </Card>
</template>
