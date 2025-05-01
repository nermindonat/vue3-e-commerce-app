<template>
  <div class="relative">
    <label :id="name" v-if="label" :required="required">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      :value="modelValue"
      @change="handleChange"
      class="block w-full p-2 h-[40px] text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 bg-gray-50"
    >
      <option disabled value="" v-if="!modelValue">
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <span
      v-if="errorMessage"
      class="text-red-400 text-[11px] pt-[2px] font-roboto absolute top-full"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed } from "vue";

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  modelValue?: string | unknown;
  options: Option[];
  required?: boolean;
  errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Seçiniz",
  required: false,
});

const { errorMessage: vError } = useField(() => props.name, undefined, {
  validateOnValueUpdate: true,
  syncVModel: true,
});

const errorMessage = computed(() => props.errorMessage ?? vError.value);

const handleChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  emit("update:modelValue", value);
};

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
}>();
</script>
