<template>
  <div class="w-full flex justify-center mt-5">
    <div
      v-if="totalProductQuantity"
      class="w-[1200px] flex justify-between gap-4"
    >
      <div class="w-[75%] flex flex-col">
        <h2 class="text-2xl mb-5">Sepetim ({{ totalProductQuantity }} Ürün)</h2>
        <div
          v-if="!authStore.isAuth"
          class="border border-gray-300 rounded bg-[#f0f5ff] p-4 px-6 shadow-sm mb-5"
        >
          <div class="flex items-center">
            <div class="flex items-center justify-center text-lg">
              <Icon icon="iconamoon:profile-bold" class="w-[1.2em] h-[1.2em]" />
            </div>
            <span class="text-gray-800 text-base font-medium ml-3"
              >Alışverişini daha hızlı tamamlamak için</span
            >
            <router-link
              to="/giris-yap"
              class="ml-2 text-[#f27a1a] font-semibold underline"
            >
              Giriş Yap
            </router-link>
          </div>
        </div>
        <div
          v-for="item in cartStore.allCartItems"
          :key="item.productId"
          class="w-full h-[200px] bg-white p-5 border shadow-sm rounded-md mb-10"
          @click="setSelectedProduct(item.productId)"
        >
          <div class="flex items-center gap-4">
            <div class="w-[100px] h-[150px] flex-shrink-0">
              <img
                :src="getImageUrl(item.product?.image)"
                alt="Ürün Görseli"
                class="w-full h-full object-cover rounded-md border"
              />
            </div>
            <div class="flex-1">
              <h3 class="text-base font-medium text-gray-800 mb-4">
                {{ item.product?.name }}
              </h3>
              <p class="text-sm text-gray-600">
                Fiyat:
                <span class="text-[#F27A1AFF] font-bold"
                  >{{ item.product?.price }} TL</span
                >
              </p>
            </div>
            <div class="flex items-center gap-2 mr-5">
              <button
                class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                @click.stop="cartStore.decreaseQuantity(item.productId)"
              >
                -
              </button>
              <span class="text-lg font-medium">{{ item.quantity }}</span>
              <button
                class="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300"
                @click.stop="cartStore.increaseQuantity(item.productId)"
              >
                +
              </button>
            </div>
            <button class="flex flex-row items-center text-base ml-5">
              <Icon
                icon="material-symbols-light:delete-outline"
                width="24"
                height="24"
              />
              <span class="font-semibold">Sil</span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-[25%] h-[300px] bg-white p-5 border shadow-md rounded-md">
        <h3 class="text-lg font-bold mb-5">Sipariş Özeti</h3>
        <div class="flex justify-between mb-4">
          <span class="text-sm text-gray-600">Ürünün Toplamı:</span>
          <span class="text-sm font-medium text-gray-800"> TL</span>
        </div>
        <div class="flex justify-between mb-4">
          <span class="text-sm text-gray-600">Kargo Toplam:</span>
          <span class="text-sm font-medium text-gray-800">Ücretsiz</span>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between mb-4">
          <span class="text-base font-bold">Toplam:</span>
          <span class="text-base font-bold text-[#F27A1AFF]"> TL</span>
        </div>
        <button
          class="w-full bg-[#F27A1AFF] text-white font-semibold py-2 rounded-md hover:bg-orange-400"
          @click="clickConfirmCart"
        >
          Sepeti Onayla
        </button>
        <div v-if="showWarningModal">
          <WarningModal
            :open="showWarningModal"
            @close="closeModal"
            @loginOrSignUp="handleLoginOrSignUp"
            @continueWithoutSignUp="handleContinueWithoutSignUp"
          ></WarningModal>
        </div>
      </div>
    </div>
    <div
      v-else
      class="w-[1200px] flex justify-between border border-gray-200 rounded-lg p-4 px-6 shadow-sm box-border"
    >
      <div class="flex items-center">
        <div
          class="w-[50px] h-[50px] flex items-center justify-center bg-[#fff1e6] text-[#f27a1a] text-2xl rounded-full"
        >
          <Icon icon="icon-park-outline:shopping" class="w-[1.2em] h-[1.2em]" />
        </div>
        <span class="text-gray-800 text-lg font-semibold ml-5"
          >Sepetinde ürün bulunmamaktadır.</span
        >
      </div>
      <button
        class="flex items-center ml-auto text-white bg-[#F27A1AFF] font-semibold border-0 py-2 px-6 focus:outline-none hover:bg-orange-400 rounded"
        @click="clickStartShopping"
      >
        Alışverişe Başla
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useCartStore } from "../../stores/cart";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getImageUrl } from "../../utils/imageUtils";
import { urlFormat } from "../../utils/formatters";
import { useProductsStore } from "../../stores/products";
import { useAuthStore } from "../../stores/auth";
import WarningModal from "./WarningModal.vue";

const router = useRouter();
const cartStore = useCartStore();
const productStore = useProductsStore();
const authStore = useAuthStore();
const showWarningModal = ref(false);

const totalProductQuantity = computed(() => {
  return authStore.isAuth
    ? cartStore.totalQuantity
    : cartStore.totalQuantityLocalstorage;
});

const setSelectedProduct = (id: number) => {
  productStore.selectedProductId = id;
  const cartItem = cartStore.cartItems?.find((i) => i.productId === id);
  if (cartItem) {
    productStore.selectedProductId = cartItem.productId;
    router.push(`/urun/${urlFormat(cartItem.product.name)}`);
  }
};

const clickStartShopping = () => {
  router.push("/");
};

const clickConfirmCart = () => {
  if (authStore.isAuth) {
    console.log("Ödeme aşaması");
  } else {
    showWarningModal.value = true;
  }
};

const closeModal = () => {
  showWarningModal.value = false;
};

const handleLoginOrSignUp = () => {
  showWarningModal.value = false;
  router.push("/giris-yap");
};

const handleContinueWithoutSignUp = () => {
  showWarningModal.value = false;
};

onMounted(async () => {
  await cartStore.fetchCartItems();
  await cartStore.fetchCartItemsLocalstorage();
});
</script>
