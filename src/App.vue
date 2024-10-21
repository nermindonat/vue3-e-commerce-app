<template>
  <Header />
  <Navbar />
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Header from "./layouts/Header.vue";
import Navbar from "./layouts/Navbar.vue";
import { useUsersStore } from "./stores/users";

const users = useUsersStore();

onMounted(() => {
  users.fetchUsers();
});
</script>
