<template>
  <div>
    <ImageSlider />
    <div v-if="products.length > 0" class="w-[300px] h-[400px] bg-red-300">
      <ul>
        <li v-for="product in products" :key="product.id">
          <img :src="getImageUrl(product.imagePath)" alt="Product" />
          {{ product.name }} - {{ product.price }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ImageSlider from "../components/ImageSlider.vue";

const products = ref([]);

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
