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
import { useAsyncData } from "nuxt/app";
//@ts-ignore
const supabase = useSupabaseUser();

const icon = ref<string | null>(null);

const title = ref<string>();

async function addHabit() {
  const { data, pending, error, refresh } = await useAsyncData("userData", () =>
    $fetch(`/api/habit`, {
      method: "POST",
      body: {
        icon: icon.value,
        title: title.value,
        //@ts-ignore
        userId: supabase.value.id,
      },
    })
  );
}
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
          <Input id="title" v-model="title" class="col-span-3" />
        </div>
      </div>
      <Button @click="addHabit">
        <span
          className="icon-[ph--plus-bold]"
          role="img"
          aria-hidden="true"
        ></span>
        <span> Add habit </span>
      </Button>
      <SheetFooter>
        <SheetClose as-child>
          <Button type="submit"> Save changes </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
