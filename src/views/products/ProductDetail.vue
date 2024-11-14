<template>
  <section class="text-gray-700 body-font overflow-hidden bg-white">
    <div class="container px-5 py-24 mx-auto">
      <div
        v-if="productDetail"
        class="lg:w-4/5 mx-auto flex flex-wrap justify-center"
      >
        <img
          :src="getImageUrl(productDetail.image)"
          alt="img"
          class="lg:w-1/2 w-full max-w-[300px] h-[400px] object-cover object-center rounded border border-gray-200"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 mt-6 lg:mt-0">
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{ productDetail.name }}
          </h1>
          <div class="flex mb-4">
            <span class="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-[#FEC612FF]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-[#FEC612FF]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-[#FEC612FF]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-[#FEC612FF]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-[#FEC612FF]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <span class="text-gray-600 ml-3">4 Değerlendirme</span>
            </span>
            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-2 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  ></path>
                </svg>
              </a>
            </span>
          </div>
          <p class="leading-relaxed">
            {{
              productDetail.description
                ? productDetail.description
                : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus nulla vitae labore reiciendis ipsam. Ratione ab ea nemo, aperiam soluta accusamus? Corrupti, pariatur!"
            }}
          </p>
          <div class="flex flex-col mt-6 pb-5 border-b-2 border-gray-200 mb-5">
            <div v-if="colors.length > 0" class="flex flex-col mb-2">
              <span class="mr-3 font-semibold mb-2">Renk:</span>
              <div class="flex flex-row items-center">
                <button
                  v-for="color in colors"
                  :key="color.id"
                  :style="{ backgroundColor: color.value }"
                  class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none mr-2"
                ></button>
              </div>
            </div>
            <div v-if="sizes.length > 0" class="flex flex-col">
              <span class="mr-3 mb-2 font-semibold"
                >Beden: {{ selectedSize }}</span
              >
              <div class="flex flex-row items-center">
                <div v-for="size in sizes" :key="size.id" class="mb-2 mr-2">
                  <input
                    type="text"
                    :value="size.value"
                    class="w-12 m-0 mr-2 mb-2 p-2 px-3 rounded border border-gray-400 bg-white text-sm font-semibold tracking-tight text-center text-gray-800 overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#f27a1a] focus:border-[#f27a1a]"
                    readonly
                    @click="setSelectedSize(size.value)"
                  />
                </div>
              </div>
            </div>
            <div v-if="numbers.length > 0" class="flex flex-col">
              <span class="mr-3 mb-2 font-semibold"
                >Numara: {{ selectedNumber }}</span
              >
              <div class="flex flex-row items-center">
                <div v-for="num in numbers" :key="num.id" class="mb-2 mr-2">
                  <input
                    type="text"
                    :value="num.value"
                    class="w-12 m-0 mr-2 mb-2 p-2 px-3 rounded border border-gray-400 bg-white text-sm font-semibold tracking-tight text-center text-gray-800 overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#f27a1a] focus:border-[#f27a1a]"
                    readonly
                    @click="setSelectedNumber(num.value)"
                  />
                </div>
              </div>
            </div>
            <div v-if="rams.length > 0" class="flex flex-col">
              <span class="mr-3 mb-2 font-semibold"
                >Ram: {{ selectedRam }}</span
              >
              <div class="flex flex-row items-center">
                <div v-for="ram in rams" :key="ram.id" class="mb-2 mr-2">
                  <input
                    type="text"
                    :value="ram.value"
                    class="w-12 m-0 mr-2 mb-2 p-2 px-3 rounded border border-gray-400 bg-white text-sm font-semibold tracking-tight text-center text-gray-800 overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#f27a1a] focus:border-[#f27a1a]"
                    readonly
                    @click="setSelectedRam(ram.value)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">
              Fiyat:
              {{ productDetail.price }} TL
            </span>
            <button
              class="flex ml-auto text-white bg-[#F27A1AFF] border-0 py-2 px-6 focus:outline-none hover:bg-orange-400 rounded"
            >
              Sepete Ekle
            </button>
            <button
              class="relative rounded-full w-10 h-10 p-0 border border-[#e6e6e6] inline-flex items-center justify-center text-gray-500 ml-4 hover:text-[#f27a1a] hover:shadow-lg transition-all duration-200 group"
              @click="addFavorites"
            >
              <Icon
                icon="mdi:heart"
                :class="
                  isFavorite
                    ? 'text-[#f27a1a]'
                    : 'text-gray-500 hover:text-[#f27a1a]'
                "
                width="1.2em"
                height="1.2em"
              />
              <span
                class="absolute top-full mt-2 border border-[#e6e6e6] hidden group-hover:block text-[#f27a1a] text-xs rounded py-1 px-2 whitespace-nowrap"
                style="left: 50%; transform: translateX(-50%)"
              >
                {{ isFavorite ? "Favorilere eklendi" : "Favorilere ekle" }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import { useProductsStore } from "../../stores/products";
import { getImageUrl } from "../../utils/imageUtils";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useFavoritesStore } from "../../stores/favorites";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductsStore();
const favoritesStore = useFavoritesStore();
const productDetail = ref<any>(null);
const selectedProductId = productStore.selectedProductId;

interface VariantOption {
  id: number;
  value: string;
}

const colors = ref<VariantOption[]>([]);
const sizes = ref<VariantOption[]>([]);
const rams = ref<VariantOption[]>([]);
const numbers = ref<VariantOption[]>([]);
const selectedSize = ref<string>("");
const selectedNumber = ref<string>("");
const selectedRam = ref<string>("");

const isFavorite = computed(() => {
  return favoritesStore?.favoriteProducts?.some(
    (fav) => fav.productId === selectedProductId
  );
});

onMounted(() => {
  if (selectedProductId) {
    productStore
      .fetchProductById(selectedProductId)
      .then(() => {
        productDetail.value = productStore.productDetail;
        const variants = productDetail.value.groupedVariants;

        if (variants) {
          colors.value = (variants["Renk"] || []).map(
            (value: string, index: number) => ({
              id: index,
              value: value,
            })
          );
          sizes.value = (variants["Beden"] || []).map(
            (value: string, index: number) => ({ id: index, value })
          );
          rams.value = (variants["Ram"] || []).map(
            (value: string, index: number) => ({ id: index, value })
          );
          numbers.value = (variants["Numara"] || []).map(
            (value: string, index: number) => ({ id: index, value })
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  } else {
    console.error("No selectedProductId found in store!");
  }
});

const setSelectedSize = (size: string) => {
  selectedSize.value = size;
};

const setSelectedNumber = (number: string) => {
  selectedNumber.value = number;
};

const setSelectedRam = (ram: string) => {
  selectedRam.value = ram;
};

const addFavorites = async () => {
  if (isFavorite.value) {
    return;
  }
  if (authStore.isAuth) {
    try {
      const productId = productDetail.value.id;
      const userId = authStore.user?.id;
      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/favorites`,
        {
          productId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response && token) {
        await favoritesStore.fetchFavoriteProducts(token);
      }
    } catch (error) {
      console.error("Error while adding to favorites.", error);
    }
  } else {
    router.push("/giris-yap");
  }
};
</script>
