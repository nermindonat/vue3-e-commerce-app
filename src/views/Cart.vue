<template>
  <div class="w-full flex justify-center mt-5">
    <!-- Ana Sepet Alanı -->
    <div class="w-[1200px] flex justify-between gap-4">
      <!-- Ürünler Listesi -->
      <div class="w-[75%] flex flex-col">
        <h2 class="text-2xl mb-5">
          Sepetim ({{ cartStore.totalQuantity }} Ürün)
        </h2>
        <div
          v-for="item in cartStore.cartItems"
          :key="item.productId"
          class="w-full h-[200px] bg-white p-5 border shadow-sm rounded-md mb-10"
        >
          <!-- Ürün Kartları -->
          <div class="flex items-center gap-4">
            <!-- Ürün Görseli -->
            <div class="w-[100px] h-[100px] flex-shrink-0">
              <img
                :src="getImageUrl(item.productDetail?.image)"
                alt="Ürün Görseli"
                class="w-full h-full object-cover rounded-md border"
              />
            </div>

            <!-- Ürün Bilgileri -->
            <div class="flex-1">
              <h3 class="text-base font-medium text-gray-800">
                {{ item.productDetail?.name }}
              </h3>
              <p class="text-sm text-gray-600">
                Fiyat:
                <span class="text-red-500 font-bold"
                  >{{ item.productDetail?.price }} TL</span
                >
              </p>
            </div>

            <!-- Ürün Adet Kontrolü -->
            <div class="flex items-center gap-2">
              <button
                class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
              >
                -
              </button>
              <span class="text-lg font-medium">{{ item.quantity }}</span>
              <button
                class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <!-- Ürün Kaldır -->
            <button class="text-sm text-red-500 hover:underline">Kaldır</button>
          </div>
        </div>
      </div>

      <!-- Özet Bölümü -->
      <div class="w-[25%] h-[300px] bg-white p-5 border shadow-md rounded-md">
        <h3 class="text-lg font-bold mb-5">Sipariş Özeti</h3>
        <div class="flex justify-between mb-4">
          <span class="text-sm text-gray-600">Ara Toplam:</span>
          <span class="text-sm font-medium text-gray-800"> TL</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-sm text-gray-600">Kargo:</span>
          <span class="text-sm font-medium text-gray-800">Ücretsiz</span>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between mb-4">
          <span class="text-base font-bold">Toplam:</span>
          <span class="text-base font-bold text-red-500"> TL</span>
        </div>
        <button
          class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          Alışverişi Tamamla
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import { onMounted } from "vue";
import { getImageUrl } from "../utils/imageUtils";

const cartStore = useCartStore();

onMounted(async () => {
  await cartStore.fetchCartItems();
});
</script>
