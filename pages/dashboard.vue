<script setup lang="ts">
import { onMounted, watch, computed } from "vue";

const { user } = await useUser();
const { fetchHabits, habits } = useHabits();

onMounted(async () => {
  await fetchHabits();
});

watch(
  () => user,
  async (newUser) => {
    if (newUser) {
      await fetchHabits();
    }
  },
  { immediate: true }
);

const calculateCompletionRate = computed(() => {
  if (!habits.value || habits.value.length === 0) return 0;
  const completedHabits = habits.value.filter((habit) =>
    habit.activities.some(
      (activity) =>
        new Date(activity.date).toDateString() === new Date().toDateString()
    )
  );
  return Math.round((completedHabits.length / habits.value.length) * 100);
});

const calculateAverageHabitsPerDay = computed(() => {
  if (!habits.value || habits.value.length === 0) return 0;
  const totalActivities = habits.value.reduce(
    (sum, habit) => sum + habit.activities.length,
    0
  );
  const uniqueDates = new Set(
    habits.value.flatMap((habit) =>
      habit.activities.map((activity) => activity.date)
    )
  );
  return uniqueDates.size === 0
    ? 0
    : (totalActivities / uniqueDates.size).toFixed(1);
});

const calculateStreakCompletion = computed(() => {
  if (!habits.value || habits.value.length === 0) return 0;
  const totalWeeklyTarget = habits.value.reduce(
    (sum, habit) => sum + habit.weeklyTarget,
    0
  );
  const completedThisWeek = habits.value.reduce((sum, habit) => {
    const thisWeekActivities = habit.activities.filter((activity) => {
      const activityDate = new Date(activity.date);
      const today = new Date();
      const weekStart = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      return activityDate >= weekStart;
    });
    return sum + thisWeekActivities?.length;
  }, 0);
  return Math.round((completedThisWeek / totalWeeklyTarget) * 100);
});
</script>

<template>
  <div class="flex flex-col">
    <main
      class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pt-2 bg-transparent"
    >
      <div class="col-span-1 lg:col-span-2 bg-transparent">
        <Card
          class="bg-background *:text-zinc-100 !border[2px] !border-brand/20"
        >
          <CardHeader class="flex items-center justify-between flex-row">
            <div class="space-y-2">
              <CardTitle class="text-4xl tracking-wide">Your Habits</CardTitle>
              <CardDescription class="text-zinc-300 text-xl"
                >Manage your daily habits.</CardDescription
              >
            </div>
            <AddNewHabit />
          </CardHeader>
          <CardContent class="overflow-y-auto flex-grow">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Habit v-for="habit in habits" :key="habit.id" :habit="habit" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div
        class="col-span-1 lg:col-span-1 flex flex-col items-stretch justify-between bg-transparent gap-4"
      >
        <Card
          class="bg-background *:text-zinc-100 !border-[1px] !border-brand/20 shadow-lg h-fit !gap-2"
        >
          <CardHeader class="!px-6 !pt-6 !pb-0">
            <CardTitle class="text-4xl tracking-wide">Insights</CardTitle>
            <CardDescription class="text-zinc-100 text-lg"
              >Track your progress and stay motivated.</CardDescription
            >
          </CardHeader>
          <CardContent class="flex flex-col h-fit !px-6 !py-4">
            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
              >
                <div class="text-4xl font-bold">{{ habits?.length || 0 }}</div>
                <div class="text-zinc-300 text-sm">Habits Created</div>
              </div>
              <div
                class="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
              >
                <div class="text-4xl font-bold">
                  {{ calculateCompletionRate }}%
                </div>
                <div class="text-zinc-300 text-sm">Habit Completion Rate</div>
              </div>
              <div
                class="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
              >
                <div class="text-4xl font-bold">
                  {{ calculateAverageHabitsPerDay }}
                </div>
                <div class="text-zinc-300 text-sm">Average Habits per Day</div>
              </div>
              <div
                class="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
              >
                <div class="text-4xl font-bold">
                  {{ calculateStreakCompletion }}%
                </div>
                <div class="text-zinc-300 text-sm">Streak Completion</div>
              </div>
            </div>
            <div class="mt-6 flex-grow">
              <LinechartChart class="h-full" />
            </div>
          </CardContent>
        </Card>
        <Card
          class="bg-background *:text-zinc-100 !border-[1px] shadow-lg flex-grow pt-6 h-1/2 !border-brand/20"
        >
          <CardContent>
            <HabitLineChart class="h-full" />
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
