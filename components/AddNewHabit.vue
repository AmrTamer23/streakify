<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ref } from "vue";
import { Vue3IconPicker } from "vue3-icon-picker";
import "vue3-icon-picker/dist/style.css";

const newHabit = ref<Habit>();

const icon = ref<string>();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="text-lg font-semibold gap-2">
        <span
          className="icon-[ph--plus-bold]"
          role="img"
          aria-hidden="true"
        ></span>
        <span> Create Habit </span>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="text-zinc-200"> Create a new habit </SheetTitle>
        <SheetDescription class="text-zinc-300">
          Fill in the details below to create a new habit.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-2 items-start">
          <Label for="icon" class="text-right"> Icon </Label>
          <Vue3IconPicker placeholder="Select icon" v-model="icon" />
        </div>
        <div class="flex flex-col gap-2 items-start">
          <Label for="title" class="text-right"> Title </Label>
          <Input id="title" :value="newHabit?.title" class="col-span-3" />
        </div>
      </div>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit"> Save changes </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
