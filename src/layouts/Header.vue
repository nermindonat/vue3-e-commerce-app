<template>
  <header class="w-full h-20 flex shadow-md py-2 px-10 bg-blue-100">
    <div class="w-3/4 flex items-center justify-between">
      <div class="flex items-center">
        <img
          src="../assets/images/logo.jpg"
          alt=""
          class="w-10 h-10 mr-1 rounded"
        />
        <h2 class="text-xl">
          <span class="font-bold">N</span>&<span class="font-bold">D</span>
        </h2>
      </div>
      <div class="flex-grow flex justify-center">
        <SearchInput placeholder="Ürün ara" modelValue="search" />
      </div>
    </div>
    <div class="w-1/4 flex items-center justify-between">
      <div class="flex items-center font-bold">
        <Icon icon="iconamoon:profile-bold" class="w-[1.2em] h-[1.2em] mr-1" />
        <div class="flex text-sm font-semibold leading-4 gap-2 underline">
          <a href="">Giriş Yap</a>
          <a href="">Üye Ol</a>
        </div>
      </div>
      <div class="flex items-center font-semibold">
        <Icon
          icon="icon-park-outline:shopping"
          class="w-[1.2em] h-[1.2em] mr-1"
        />
        <a href="">Sepetim</a>
      </div>
      <div class="flex items-center font-semibold">
        <img
          src="../assets/images/avatar.png"
          alt=""
          class="w-10 h-10 mr-2 rounded-full"
        />
        <a href="">Profil</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import SearchInput from "../components/SearchInput.vue";
</script>
