<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { ref, onMounted } from "vue";

interface ActivityData {
  date: string;
  value: number;
}

const data = ref<{ date: string; "Habits Completed": number }[]>([
  {
    date: "2024-01-01",
    "Habits Completed": 0,
  },
]);
const isLoading = ref(true);

onBeforeMount(async () => {
  try {
    const response = await fetch(
      `/api/line-chart?userId=7b1580aa-4a93-4e71-a9b4-4278dff926fd`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const activities = await response.json();

    const accumulatedData: { [date: string]: number } = {};
    activities.forEach((activity: any) => {
      try {
        const date = new Date(activity.date);
        if (isNaN(date.getTime())) {
          console.error(`Invalid date: ${activity.date}`);
          return;
        }
        const value = Number(activity.count);
        if (isNaN(value)) {
          console.error(`Invalid value: ${activity.count}`);
          return;
        }
        const dateString = date.toISOString().split("T")[0];
        accumulatedData[dateString] =
          (accumulatedData[dateString] || 0) + value;
      } catch (error) {
        console.error(
          `Error processing activity: ${JSON.stringify(activity)}`,
          error
        );
      }
    });
    data.value = [
      ...data.value,
      ...Object.entries(accumulatedData)
        .map(([date, value]) => ({
          date: date,
          "Habits Completed": value,
        }))
        .sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
    ];
  } catch (error) {
    console.error("Error fetching or processing data:", error);
    data.value = [];
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <LineChart
    v-else
    :data="data"
    index="date"
    :categories="['Habits Completed']"
    :colors="['#FFC278']"
    :y-formatter="
      (tick: number | Date, i: number, ticks: number[] | Date[]) => {
        return typeof tick === 'number'
          ? `${new Intl.NumberFormat('us').format(tick).toString()}`
          : '';
      }
    "
  />
</template>
