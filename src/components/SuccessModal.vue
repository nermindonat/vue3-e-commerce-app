<template>
  <div>
    <div
      v-if="open"
      class="absolute top-0 left-0 right-0 bottom-0 bg-[#0000004d] z-50 flex justify-center items-center h-full"
    >
      <div class="p-4 overflow-x-hidden overflow-y-auto min-w-[360px]">
        <div class="relative w-full h-full max-w-md md:h-auto">
          <div class="relative bg-white rounded-lg shadow">
            <button
              @click="close"
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div class="p-6 text-center">
              <div
                class="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full border-4 border-green-400"
              >
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p class="text-lg font-medium text-gray-800">
                {{ message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  open?: boolean;
  message: string;
}
defineProps<IProps>();
const emit = defineEmits(["close"]);

const close = () => emit("close");
</script>
