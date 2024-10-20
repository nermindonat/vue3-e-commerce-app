<template>
  <div>
    <ImageSlider />
    <div
      v-if="products.length > 0"
      class="w-full mx-auto overflow-hidden my-5 px-10 py-5"
    >
      <div class="mb-4 font-semibold text-xl">
        <h2>İncelediğin Ürünlere Benzer</h2>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        <a
          href=""
          v-for="product in products"
          :key="product.id"
          class="h-[400px] bg-gray-100 border rounded-lg shadow"
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
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ImageSlider from "../components/ImageSlider.vue";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products = ref<Product[]>([]);

const fetchAllProduct = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/product`
    );
    products.value = response.data;
  } catch (error) {
    console.error("Bir sorun oluştu.", error);
  }
};
const getImageUrl = (imagePath: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}/${
    import.meta.env.VITE_IMG_FOLDER_NAME
  }/${imagePath}`;
};

onMounted(() => {
  fetchAllProduct();
});
</script>
