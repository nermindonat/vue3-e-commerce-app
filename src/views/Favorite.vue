<template>
  <div class="bg-[#fefefe] p-0 m-0">
    <div class="flex flex-col items-center">
      <div
        class="h-[70px] w-screen box-border flex items-center justify-center mb-8 shadow-sm"
      >
        <div class="w-[1200px] flex items-center justify-between h-full">
          <div class="flex items-center h-full">
            <a
              href=""
              class="flex items-center text-[#f27a1a] border-b-4 border-[#f27a1a] text-[18px] h-full mr-8 box-border"
            >
              <Icon
                icon="material-symbols:favorite-outline"
                class="w-[1.2em] h-[1.2em] mr-1"
              />
              <span>Favorilerim</span>
            </a>
          </div>
          <div class="flex flex-row items-center relative">
            <input
              type="text"
              class="w-[330px] px-[10px] pr-[40px] py-[13px] bg-[#f3f3f3] text-[14px] text-[#333333] leading-normal box-border rounded h-auto relative z-10 focus:border-[#f27a1a] focus:ring-1 focus:ring-[#f27a1a] focus:outline-none"
              placeholder="Favorilerimde Ara"
            />
            <Icon
              icon="tabler:search"
              class="absolute z-20 w-[20px] h-[20px] right-[15px] top-1/2 transform -translate-y-1/2 cursor-pointer text-[#f27a1a]"
            />
          </div>
        </div>
      </div>
      <div
        class="w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4 -mt-4"
      >
        <div
          v-for="favorite in favoritesStore.favoriteProducts"
          :key="favorite.id"
          class="relative h-[400px] bg-gray-100 border rounded-lg shadow flex flex-col justify-between"
          @click="setSelectedProduct(favorite.id)"
        >
          <button
            class="absolute top-2 right-2 border border-[#e6e6e6] hover:border-[#f27a1a] bg-white text-gray-500 rounded-full p-1 cursor-pointer shadow-md hover:text-[#f27a1a] hover:shadow-lg transition-all duration-200 group"
            @click.stop="deleteFavoriteProduct(favorite.id)"
          >
            <Icon icon="ic:round-close" width="1.2em" height="1.2em" />
            <span
              class="absolute top-full mt-2 border border-[#e6e6e6] bg-white hidden group-hover:block text-[#f27a1a] text-xs rounded py-1 px-2 whitespace-nowrap z-10"
              style="left: 50%; transform: translateX(-50%)"
            >
              {{ "Favorilerden sil" }}
            </span>
          </button>
          <div>
            <div class="w-full h-[300px]">
              <img
                :src="getImageUrl(favorite.product.image)"
                alt="Product"
                class="w-full h-full object-cover rounded-t-lg"
              />
            </div>
            <div class="m-2">
              <h2 class="line-clamp">{{ favorite.product.name }}</h2>
            </div>
          </div>
          <span class="m-2 font-semibold mt-auto"
            >{{ favorite.product.price }} TL</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { urlFormat } from "../utils/formatters";
import { getImageUrl } from "../utils/imageUtils";
import { useFavoritesStore } from "../stores/favorites";
import { useProductsStore } from "../stores/products";
import { useAuthStore } from "../stores/auth";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const productStore = useProductsStore();

const setSelectedProduct = (id: number) => {
  const favoriteProduct = favoritesStore.favoriteProducts?.find(
    (fav) => fav.id === id
  );
  if (favoriteProduct) {
    productStore.selectedProductId = favoriteProduct?.productId;
    router.push(`/urun/${urlFormat(favoriteProduct.product.name)}`);
  } else {
    console.warn(`Favorite product with id ${id} not found.`);
  }
};

const deleteFavoriteProduct = async (favoriteId: number) => {
  if (authStore.isAuth) {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/favorites/${favoriteId}`,
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
      console.error("Error while deleting to favorites.", error);
    }
  }
};
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
