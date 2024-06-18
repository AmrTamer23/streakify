<script setup lang="ts">
import { VisXYContainer, VisArea } from "@unovis/vue";
//@ts-ignore
const props = defineProps<{ data: DataRecord[] }>();
//@ts-ignore
const x = (d: DataRecord) => d.x;
//@ts-ignore
const y = (d: DataRecord) => d.y;
</script>

<template>
  <VisXYContainer :data="data">
    <VisArea :minHeight1Px="true" :x="x" :y="y" />
  </VisXYContainer>
</template>
