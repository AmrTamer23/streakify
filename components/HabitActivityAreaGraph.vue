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
    <VisArea :minHeight1Px="false" :x="x" :y="y" color="#FFC278" />
  </VisXYContainer>
</template>
