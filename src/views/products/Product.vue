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
        class="h-[400px] bg-gray-100 border rounded-lg shadow"
        @click="setSelectedProduct(product.id)"
      >
        <div class="w-full h-[300px]">
          <img
            :src="getImageUrl(product.image)"
            alt="Product"
            class="w-full h-full object-cover rounded-t-lg"
          />
        </div>
        <div class="flex flex-col m-2 items-start">
          <h2>{{ product.name }}</h2>
          <span class="mt-5 font-semibold">{{ product.price }} TL</span>
        </div>
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
