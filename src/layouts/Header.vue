<template>
  <header
    class="w-full h-20 flex shadow-md py-2 px-10 bg-blue-100 fixed top-0 left-0 z-50"
  >
    <div class="w-3/4 flex items-center justify-between">
      <a href="/" class="flex items-center">
        <img
          src="../assets/images/logo.jpg"
          alt=""
          class="w-10 h-10 mr-1 rounded"
        />
        <h2 class="text-xl">
          <span class="font-bold">N</span>&<span class="font-bold">D</span>
        </h2>
      </a>
      <div class="flex-grow flex justify-center">
        <SearchInput placeholder="Ürün, kategori. marka ara" modelValue="" />
      </div>
    </div>
    <div class="w-1/4 flex items-center justify-between">
      <div class="relative flex items-center font-bold cursor-pointer">
        <Icon icon="iconamoon:profile-bold" class="w-[1.2em] h-[1.2em] mr-1" />
        <div
          v-if="authStore.isAuth"
          class="flex flex-col text-sm font-semibold leading-4"
          @mouseenter="showDropdown = true"
        >
          <span class="font-medium text-xs">Hesabım</span>
          <span class="text-sm"
            >{{ authStore.user?.name }} {{ authStore.user?.surname }}</span
          >
          <div
            v-if="showDropdown"
            class="max-w-[170px] absolute flex flex-col bg-white shadow-md border border-gray-300 rounded-lg p-4 mt-10 cursor-pointer"
            @mouseleave="showDropdown = false"
            style="top: 20%; left: 50%; transform: translateX(-50%)"
          >
            <div
              class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full"
              style="
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-bottom: 8px solid white;
                filter: drop-shadow(0 -2px 2px rgba(0, 0, 0, 0.1));
              "
            ></div>
            <p
              class="text-red-400 mb-2 border-b-2 pb-2 overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {{ authStore.user?.email }}
            </p>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="lsicon:order-outline" />
              <router-link
                to="/siparislerim"
                class="block text-xs py-1 ml-2"
                @click="showDropdown = false"
                >Siparişlerim</router-link
              >
            </div>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="mingcute:comment-line" />
              <router-link
                to="/degerlendirmelerim"
                class="block text-xs py-1 ml-2"
                @click="showDropdown = false"
                >Değerlendirmelerim</router-link
              >
            </div>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="ic:outline-discount" />
              <router-link
                to="/indirim-kuponlarim"
                class="block text-xs py-1 ml-2"
                @click="showDropdown = false"
                >İndirim Kuponlarım</router-link
              >
            </div>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="tdesign:user" />
              <router-link
                to="/kullanici-bilgilerim"
                class="block text-xs py-1 ml-2"
                @click="showDropdown = false"
                >Kullanıcı Bilgilerim</router-link
              >
            </div>
            <div class="flex flex-row items-center">
              <Icon icon="ic:baseline-logout" />
              <router-link
                to="/"
                @click.prevent="logout"
                class="block text-xs py-1 ml-2"
                >Çıkış Yap</router-link
              >
            </div>
          </div>
        </div>

        <div
          v-else
          class="flex text-sm font-semibold leading-4 gap-2 underline"
        >
          <router-link to="/giris-yap">Giriş Yap</router-link>
          <!-- <router-link to="/uye-ol">Üye Ol</router-link> -->
        </div>
      </div>
      <div
        class="flex flex-row justify-center items-center font-semibold hover:text-[#f27a1a] cursor-pointer"
      >
        <Icon
          icon="material-symbols:favorite-outline"
          class="w-[1.2em] h-[1.2em] mr-1"
        />
        <a href="" @click="handleFavoritesClick">Favorilerim</a>
        <div
          v-if="authStore.isAuth && favoriteCount"
          class="flex items-center justify-center bg-[#f27a1a] text-white text-[11px] w-4 h-4 leading-[16px] text-center ml-[3px] rounded-full z-10"
        >
          {{ favoriteCount }}
        </div>
      </div>
      <div class="flex items-center font-semibold">
        <Icon
          icon="icon-park-outline:shopping"
          class="w-[1.2em] h-[1.2em] mr-1"
        />
        <a href="">Sepetim</a>
        <div
          v-if="authStore.isAuth"
          class="bg-[#f27a1a] text-white text-[11px] w-4 h-4 leading-[16px] text-center ml-[3px] rounded-full z-10"
        >
          1
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SearchInput from "../components/SearchInput.vue";
import { useAuthStore } from "../stores/auth";
import { useFavoritesStore } from "../stores/favorites";
import { useRouter } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const showDropdown = ref(false);

const logout = () => {
  authStore.logout();
};

const favoriteCount = computed(() => {
  return favoritesStore?.favoriteProducts?.length;
});

const handleFavoritesClick = () => {
  if (authStore.isAuth) {
    router.push("/favorilerim");
  } else {
    router.push("/giris-yap");
  }
};

watch(
  () => authStore.isAuth,
  (newVal) => {
    if (newVal) {
      showDropdown.value = false;
    }
  }
);

onMounted(async () => {
  authStore.checkAuth();
  const token = localStorage.getItem("access_token");
  if (token) {
    await favoritesStore.fetchFavoriteProducts(token);
  }
});
</script>
