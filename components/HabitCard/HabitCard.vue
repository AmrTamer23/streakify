<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
defineProps({
  habit: {
    type: Object as () => Habit,
    required: true,
  },
});

type WeekProgress = {
  progressPercentage: number;
  daysAcquired: number;
};

function calculateWeekProgress(
  activities: Activity[],
  targetValue: number
): WeekProgress {
  const currentDate = new Date();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weekActivities = activities.filter((activity) => {
    const activityDate = new Date(activity.date);
    return activityDate >= startOfWeek && activityDate <= endOfWeek;
  });

  const currentValue = weekActivities.reduce(
    (sum, activity) => sum + activity.y,
    0
  );

  const progressPercentage = (currentValue / targetValue) * 100;

  const uniqueDays = new Set(
    weekActivities.map((activity) => {
      const date = new Date(activity.date);
      return date.toDateString();
    })
  );

  const daysAcquired = uniqueDays.size;

  return {
    progressPercentage,
    daysAcquired,
  };
}
</script>

<template>
  <Card
    class="bg-neutral-900/35 text-zinc-200 hover:border-brand cursor-pointer hover:bg-zinc-900 transition-all ease-in-out duration-200"
  >
    <CardHeader>
      <CardTitle class="flex items-center justify-between w-full">
        <div class="flex gap-2 flex-col">
          <span v-html="habit.icon" class="[&_svg]:h-10 [&_svg]:w-10"></span>
          <div class="text-lg text-zinc-100">{{ habit.title }}</div>
        </div>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex items-end justify-between gap-8 flex-col">
      <Progress
        :model-value="
          calculateWeekProgress(habit.activities, habit.weeklyTarget)
            .progressPercentage
        "
      />
      <div class="text-center w-full text-zinc-300">
        {{
          calculateWeekProgress(habit.activities, habit.weeklyTarget)
            .daysAcquired
        }}
        / {{ habit.weeklyTarget }} Days This Week
      </div>
    </CardContent>
  </Card>
</template>
