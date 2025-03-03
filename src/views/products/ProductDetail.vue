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
          <div
            v-for="variant in variantOptionList"
            class="flex flex-col mt-6 mb-4"
          >
            <div v-if="variant.value === 'Renk'" class="flex flex-col">
              <span class="mr-3 font-semibold mb-2">{{ variant.value }}:</span>
              <div class="flex flex-row items-center">
                <div
                  v-for="color in variant.variantValues"
                  :key="color.id"
                  :class="[
                    'w-12 flex items-center justify-center rounded-xl py-2',
                    color.value === selectedColor
                      ? 'border-2 border-[#f27a1a]'
                      : 'border-2 border-transparent',
                  ]"
                >
                  <button
                    :style="{ backgroundColor: color.value }"
                    class="border-2 border-gray-400 rounded-full w-6 h-6 focus:outline-none"
                    @click="selectedColor = color.value"
                  ></button>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col">
              <span class="mr-3 mb-2 font-semibold"
                >{{ variant.value }}: {{ selectedValue }}</span
              >
              <div class="flex flex-row items-center">
                <div
                  v-for="variantValue in variant.variantValues"
                  :key="variantValue.id"
                  class="mb-2 mr-2"
                >
                  <input
                    type="text"
                    :value="variantValue.value"
                    :class="[
                      'w-14 m-0 mr-2 mb-2 p-2 px-3 rounded-xl bg-white text-sm font-semibold tracking-tight text-center text-gray-800 overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#f27a1a] focus:border-[#f27a1a]',
                      showWarning && !selectedValue
                        ? 'border-2 border-red-500 shake-animation'
                        : 'border border-gray-200',
                    ]"
                    readonly
                    @click="setSelectedValue(variantValue.value)"
                    @animationend="handleAnimationEnd"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex border-t-2 border-gray-200 pt-5">
            <span class="title-font font-medium text-2xl text-gray-900">
              Fiyat:
              {{ productDetail.price }} TL
            </span>
            <button
              :class="[
                'flex ml-auto text-white font-semibold  border-0 py-2 px-6 focus:outline-none  rounded',
                successMessage
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#F27A1AFF] hover:bg-orange-400',
              ]"
              @click="addToCartClick"
            >
              {{ successMessage ? "Sepete Eklendi" : "Sepete Ekle" }}
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
import { urlFormat } from "../../utils/formatters";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useFavoritesStore } from "../../stores/favorites";
import { useCartStore } from "../../stores/cart";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const productStore = useProductsStore();
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const productDetail = ref<any>(null);
const selectedProductId = productStore.selectedProductId;
const showWarning = ref(false);
const successMessage = ref(false);
const productSlug = String(route.params.name);

interface VariantValue {
  id: number;
  value: string;
}

interface Variant {
  variantId: number;
  value: string;
  variantValues: VariantValue[];
}

const variantOptionList = ref<Variant[]>([]);
const selectedValue = ref<string>("");
const selectedColor = ref<string>("");

const isFavorite = computed(() => {
  return favoritesStore?.favoriteProducts?.some(
    (fav) => fav.productId === selectedProductId
  );
});

// Store'daki ürün listesinden urlFormat ile eşleşen ürünü buluyoruz.
const findProductBySlug = (slug: string) => {
  return productStore.products?.find(
    (product) => urlFormat(product.name) === slug
  );
};

onMounted(async () => {
  if (!productStore.products) {
    await productStore.fetchAllProducts();
  }
  const product = findProductBySlug(productSlug);
  if (product) {
    await productStore
      .fetchProductById(product.id)
      .then(() => {
        productDetail.value = productStore.productDetail;
        const variants = productDetail.value.groupedVariants;

        if (variants) {
          Object.entries(variants).forEach(([variantName, values], index) => {
            const variantValues = (values as string[]).map((value, idx) => ({
              id: idx,
              value,
            }));
            if (variantName === "Renk") {
              variantOptionList.value.unshift({
                variantId: index,
                value: variantName,
                variantValues,
              });
              if (variantValues.length > 0) {
                selectedColor.value = variantValues[0].value;
              }
            } else {
              variantOptionList.value.push({
                variantId: index,
                value: variantName,
                variantValues,
              });
            }
          });
        }
      })
      .catch((error) => {
        console.error("An error occurred while fetching the product.", error);
      });
  } else {
    console.error("Product not found!");
  }
});

const setSelectedValue = (value: string) => {
  selectedValue.value = value;
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

const addToCartClick = () => {
  productDetail.value = productStore.productDetail;
  const variants = productDetail.value.groupedVariants;
  // Eğer ürünün varyantları varsa ve selectedValue seçilmemişse uyarı göster
  if (Object.keys(variants).length > 0 && !selectedValue.value) {
    showWarning.value = true;
  } else {
    cartStore.addToCart(productDetail.value, selectedValue.value);
    successMessage.value = true;
    selectedValue.value = "";
    setTimeout(() => {
      successMessage.value = false;
    }, 1000);
  }
};

const handleAnimationEnd = () => {
  showWarning.value = false;
};
</script>

<style scoped>
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

.shake-animation {
  animation: shake 1.5s ease-in-out;
}
</style>
