<template>
  <div class="w-full mx-auto overflow-hidden my-5 px-10 py-5">
    <div class="mb-4 font-semibold text-xl">
      <h2>Popüler Ürünler</h2>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
    >
      <router-link
        :to="`/urun/${urlFormat(product.name)}`"
        v-for="product in productStore.products"
        :key="product.id"
        class="h-[400px] bg-gray-100 border rounded-lg shadow flex flex-col justify-between"
        @click="setSelectedProduct(product.id)"
      >
        <div>
          <div class="w-full h-[300px]">
            <img
              :src="getImageUrl(product.image)"
              alt="Product"
              class="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div class="m-2">
            <h2 class="line-clamp">{{ product.name }}</h2>
          </div>
        </div>
        <span class="m-2 font-semibold mt-auto">{{ product.price }} TL</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useProductsStore } from "../../stores/products";
import { urlFormat } from "../../utils/formatters";
import { getImageUrl } from "../../utils/imageUtils";

const productStore = useProductsStore();

const setSelectedProduct = (id: number) => {
  productStore.selectedProductId = id;
  productStore.fetchProductById(id);
};

onMounted(() => {
  productStore.fetchAllProducts();
});
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
