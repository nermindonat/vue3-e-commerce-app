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
              <svg
                aria-hidden="true"
                class="mx-auto mb-4 text-[#eca366] w-14 h-14"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 class="mb-5 text-lg font-bold text-[#333]">
                N&D Hesabınız Yok Mu?
              </h3>

              <button
                @click="continueWithoutSignUp"
                type="button"
                class="text-[#F27A1AFF] bg-white hover:bg-[#F27A1AFF] rounded border border-[#F27A1AFF] text-sm font-bold px-5 py-2.5 hover:text-white mr-2"
              >
                Üye Olmadan Devam Et
              </button>
              <button
                @click="loginOrSignUp"
                type="button"
                class="text-[#F27A1AFF] bg-white hover:bg-[#F27A1AFF] rounded border border-[#F27A1AFF] text-sm font-bold px-5 py-2.5 hover:text-white"
              >
                Giriş Yap / Üye Ol
              </button>
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
}
defineProps<IProps>();
const emit = defineEmits(["close", "loginOrSignUp", "continueWithoutSignUp"]);

const close = () => emit("close");
const loginOrSignUp = () => emit("loginOrSignUp");
const continueWithoutSignUp = () => emit("continueWithoutSignUp");
</script>
