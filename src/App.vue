<template>
  <Header />
  <Navbar />
  <router-view />
</template>
<script setup lang="ts">
import Header from "./layouts/Header.vue";
import Navbar from "./layouts/Navbar.vue";
</script>
