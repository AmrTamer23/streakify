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
  <Card>
    <CardHeader>
      <CardTitle>
        <div class="flex items-center gap-2">
          <span>{{ habit.icon }}</span>
          <div class="text-lg text-gray-400">{{ habit.title }}</div>
        </div>
      </CardTitle>
      <CardDescription>
        Current Streak: {{ habit.currStreak }}
      </CardDescription>
    </CardHeader>
    <CardContent> </CardContent>
    <CardFooter> </CardFooter>
  </Card>
</template>
