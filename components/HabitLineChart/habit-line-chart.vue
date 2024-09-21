<script setup lang="ts">
import { LineChart } from "@/components/ui/chart-line";
import { ref } from "vue";

const data = ref<{ date: string; "Habits Completed": number }[]>([
  {
    date: "2024-01-01",
    "Habits Completed": 0,
  },
]);

const lineChartCalc = () => {
  const chartData = habits.value
    .map((h) => h.activities)
    .flat()
    .reduce<Record<string, number>>((acc, habit) => {
      const date = habit.date.split("T")[0];
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date]++;
      return acc;
    }, {});

  data.value = [
    ...data.value,
    ...Object.entries(chartData).map(([date, count]) => ({
      date,
      "Habits Completed": count,
    })),
  ];
};

const { habits } = useHabits();
onMounted(() => {
  lineChartCalc();
});

watch(
  () => habits.value,
  () => {
    lineChartCalc();
  }
);
</script>

<template>
  <LineChart
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
