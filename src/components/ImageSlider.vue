<template>
  <div
    class="relative w-3/4 h-[400px] mx-auto overflow-hidden mt-5 rounded-md border border-gray-300"
  >
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="w-full h-full flex-shrink-0"
      >
        <img :src="image" alt="Slider" class="w-full h-[400px]" />
      </div>
    </div>
    <button
      @click="clickPrev"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full focus:outline-none"
    >
      <Icon icon="grommet-icons:previous" />
    </button>
    <button
      @click="clickNext"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full focus:outline-none"
    >
      <Icon icon="grommet-icons:next" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import electronicImage from "../assets/images/electronic.webp";
import homeLife from "../assets/images/home_and_life.jpg";
import mother from "../assets/images/mother.jpg";
import baby from "../assets/images/baby.jpg";
import child from "../assets/images/child.jpg";
import male from "../assets/images/male.jpg";
import cosmetic from "../assets/images/cosmetic.jpg";
import sport from "../assets/images/sport.jpg";

const images = ref<string[]>([
  electronicImage,
  homeLife,
  mother,
  baby,
  child,
  male,
  cosmetic,
  sport,
]);

const currentIndex = ref(0);

const clickPrev = () => {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : images.value.length - 1;
};

const clickNext = () => {
  currentIndex.value =
    currentIndex.value < images.value.length - 1 ? currentIndex.value + 1 : 0;
};

// let intervalId: number | undefined;

// onMounted(() => {
//   intervalId = window.setInterval(() => {
//     clickNext();
//   }, 3000);
// });

// onUnmounted(() => {
//   if (intervalId) {
//     clearInterval(intervalId);
//   }
// });
</script>
