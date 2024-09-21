import VueCalendarHeatmap from "vue3-calendar-heatmap";
export default defineNuxtPlugin((app) => {
  app.vueApp.use(VueCalendarHeatmap);
});
