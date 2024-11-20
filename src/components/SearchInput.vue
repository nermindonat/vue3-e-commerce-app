<template>
  <div class="relative w-3/4">
    <input
      type="text"
      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:border-[#f27a1a] focus:ring-1 focus:ring-[#f27a1a] focus:outline-none block p-2.5"
      :placeholder="placeholder ? placeholder : 'Search ...'"
      required
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <div
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-[#f27a1a]"
    >
      <span
        class="text-xl cursor-pointer material-symbols-rounded"
        @click="$emit('update:modelValue', '')"
        ><Icon icon="tabler:search"
      /></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
export interface IProps {
  modelValue: string;
  placeholder?: string;
}

defineProps<IProps>();

defineEmits(["update:modelValue"]);
</script>
