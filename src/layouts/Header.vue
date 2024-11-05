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
        <SearchInput placeholder="Ürün ara" modelValue="search" />
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
            class="absolute flex flex-col bg-white shadow-md p-4 rounded mt-10 cursor-pointer"
            @mouseleave="showDropdown = false"
          >
            <p class="text-red-400 mb-2 border-b-2 pb-2">
              {{ authStore.user?.email }}
            </p>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="lsicon:order-outline" />
              <a href="/siparisler" class="block text-xs py-1 ml-2"
                >Siparişlerim</a
              >
            </div>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="mingcute:comment-line" />
              <a href="/degerlendirme" class="block text-xs py-1 ml-2"
                >Değerlendirmelerim</a
              >
            </div>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="ic:outline-discount" />
              <a href="/indirim-kuponlarim" class="block text-xs py-1 ml-2"
                >İndirim Kuponlarım</a
              >
            </div>
            <div class="flex flex-row items-center mb-2">
              <Icon icon="tdesign:user" />
              <a href="/kullanici-bilgilerim" class="block text-xs py-1 ml-2"
                >Kullanıcı Bilgilerim</a
              >
            </div>
            <div class="flex flex-row items-center">
              <Icon icon="ic:baseline-logout" />
              <a
                href="/"
                @click.prevent="logout"
                class="block text-xs py-1 ml-2"
                >Çıkış Yap</a
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
      <div class="flex items-center font-semibold">
        <Icon
          icon="material-symbols:favorite-outline"
          class="w-[1.2em] h-[1.2em] mr-1"
        />
        <a href="">Favorilerim</a>
      </div>
      <div class="flex items-center font-semibold">
        <Icon
          icon="icon-park-outline:shopping"
          class="w-[1.2em] h-[1.2em] mr-1"
        />
        <a href="">Sepetim</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SearchInput from "../components/SearchInput.vue";
import { useAuthStore } from "../stores/auth";
import { onMounted, ref } from "vue";

const authStore = useAuthStore();
const showDropdown = ref(false);

const logout = () => {
  authStore.logout();
};

onMounted(() => {
  authStore.checkAuth();
});
</script>
