<script setup lang="ts">
import { onBeforeMount, watch, computed, ref } from "vue";
import {
  calculateAverageHabitsPerDay,
  calculateCompletionRate,
  calculateStreakCompletion,
} from "~/lib/utils";

const itemsPerPage = 6;
const currentPage = ref(1);
const completionRate = ref(0);
const averageHabitsPerDay = ref(0);
const streakCompletion = ref(0);

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const { fetchHabits, habits } = useHabits();

const paginatedHabits = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return habits.value?.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(habits.value?.length / itemsPerPage)
);

onBeforeMount(async () => {
  await fetchHabits();
  completionRate.value = calculateCompletionRate(habits.value);
  averageHabitsPerDay.value = calculateAverageHabitsPerDay(habits.value);
  streakCompletion.value = calculateStreakCompletion(habits.value);
});

watch(
  () => habits.value,
  async (newHabits) => {
    if (newHabits) {
      completionRate.value = calculateCompletionRate(newHabits);
      averageHabitsPerDay.value = calculateAverageHabitsPerDay(newHabits);
      streakCompletion.value = calculateStreakCompletion(newHabits);
    }
  }
);
</script>

<template>
  <div class="flex flex-col">
    <main
      class="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pt-2 bg-transparent"
    >
      <div class="col-span-1 lg:col-span-2 bg-transparent">
        <Card
          class="bg-background *:text-zinc-100 !border[2px] !border-brand/20 h-full flex flex-col justify-between"
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
              <Habit
                v-for="habit in paginatedHabits"
                :key="habit.id"
                :habit="habit"
              />
            </div>
          </CardContent>
          <CardFooter class="w-full">
            <div class="mt-4 flex justify-between items-center w-full">
              <Button @click="prevPage" :disabled="currentPage === 1"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="m11 18l-6-6l6-6l1.4 1.4L7.825 12l4.575 4.6zm6.6 0l-6-6l6-6L19 7.4L14.425 12L19 16.6z"
                  />
                </svg>
              </Button>
              <span class="text-zinc-500 text-sm"
                >Page {{ currentPage }} of {{ totalPages }}</span
              >
              <Button @click="nextPage" :disabled="currentPage === totalPages"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M9.575 12L5 7.4L6.4 6l6 6l-6 6L5 16.6zm6.6 0L11.6 7.4L13 6l6 6l-6 6l-1.4-1.4z"
                  />
                </svg>
              </Button>
            </div>
          </CardFooter>
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
                <div class="text-4xl font-bold">{{ completionRate }}%</div>
                <div class="text-zinc-300 text-sm">Habit Completion Rate</div>
              </div>
              <div
                class="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
              >
                <div class="text-4xl font-bold">
                  {{ averageHabitsPerDay }}
                </div>
                <div class="text-zinc-300 text-sm">Average Habits per Day</div>
              </div>
              <div
                class="bg-muted/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2"
              >
                <div class="text-4xl font-bold">{{ streakCompletion }}%</div>
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
