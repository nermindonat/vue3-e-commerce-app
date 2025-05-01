<template>
  <div :class="wrapperClass">
    <Label :id="name" v-if="label" :required="required">{{ label }}</Label>
    <div class="relative">
      <textarea
        :id="name"
        :name="name"
        class="block w-full p-2 min-h-[100px] text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
        :placeholder="placeholder"
        v-model="value"
        :disabled="disabled"
      />
      <span
        v-if="errorMessage"
        class="text-red-400 text-[11px] pt-[2px] font-roboto absolute top-full"
      >
        {{ errorMessage }}
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useField } from "vee-validate";
import { computed } from "vue";
import Label from "./Label.vue";

export interface IProps {
  label?: string;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  wrapperClass?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "",
  required: false,
  disabled: false,
});

const { errorMessage: vError, value } = useField<string>(
  () => props.name,
  undefined,
  {
    validateOnValueUpdate: true,
    syncVModel: true,
  }
);

const errorMessage = computed(() => props.errorMessage ?? vError.value);
</script>
