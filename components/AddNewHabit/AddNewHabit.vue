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
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

const icon = ref<string | null>(null);

const title = ref<string>();

const targetPerWeek = ref<number>();

const { createHabit } = useHabits();
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="text-xl gap-2 bg-transparent tracking-wide py-5">
        <span class="icon-[ph--plus-bold]" role="img" aria-hidden="true"></span>
        <span> Create Habit </span>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle class="text-zinc-200"> Create a new Habit </SheetTitle>
        <SheetDescription class="text-zinc-300">
          Fill in the details below to create a new Habit.
        </SheetDescription>
      </SheetHeader>
      <div class="grid gap-4 py-4">
        <div class="flex flex-col gap-2 items-start">
          <label for="title" class="flex flex-col gap-1">
            <span> Title </span>
            <span class="text-xs text-zinc-500"> The name of your Habit </span>
          </label>
          <Input id="title" v-model="title" class="col-span-3" />
        </div>
        <div class="flex gap-2 items-center">
          <div class="flex flex-col gap-2 items-start">
            <label for="target" class="flex flex-col gap-1">
              <span> Target </span>
              <span class="text-xs text-zinc-500"> Per Week </span>
            </label>
            <NumberField :min="1" :max="7" class="text-lg">
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </div>
          <div class="flex flex-col gap-2 items-start">
            <label for="icon" class="flex flex-col gap-1">
              <span> Icon </span>
              <span class="text-xs text-zinc-500">
                Pick what best describe the habit
              </span>
            </label>
            <Vue3IconPicker placeholder="Select icon" v-model="icon" />
          </div>
        </div>
      </div>

      <SheetFooter>
        <SheetClose as-child>
          <Button
            @click="title && icon && createHabit(icon, title)"
            type="submit"
            class="gap-2 mt-4 w-full"
          >
            <span
              class="icon-[ph--plus-bold] h-5 w-5"
              role="img"
              aria-hidden="true"
            ></span>
            <span class="text-lg"> Add habit </span>
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
