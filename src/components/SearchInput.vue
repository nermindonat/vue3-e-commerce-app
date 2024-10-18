<template>
  <div class="relative w-3/4">
    <input
      type="text"
      class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block pr-10 p-2.5"
      :placeholder="placeholder ? placeholder : 'Search ...'"
      required
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
      <span
        v-if="modelValue.length"
        class="text-xl cursor-pointer material-symbols-rounded"
        @click="$emit('update:modelValue', '')"
        ><Icon icon="material-symbols-light:search"
      /></span>
      <span v-else class="material-symbols-rounded"> search </span>
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
