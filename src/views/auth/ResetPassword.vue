<template>
  <div class="w-[600px] justify-center mx-auto mt-14">
    <div class="flex flex-col items-center">
      <h2 class="text-lg font-bold">Şifre Yenileme</h2>
      <span class="mt-4"
        >Sifreniz en az 8 karakter olmalı. En az 1 büyük harf, 1 küçük harf, 1
        özel karakter ve rakam içermelidir.</span
      >
    </div>
    <div class="mt-10 p-10 border border-gray-200 rounded">
      <form>
        <div class="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          <Input
            type="password"
            name="newPassword"
            label="Yeni Şifre"
            placeholder="Yeni Şifre"
            required
            progress
          />
          <Input
            type="password"
            name="newPasswordAgain"
            label="Yeni Şifre Tekrar"
            placeholder="Yeni Şifre Tekrar"
            required
          />
          <Button type="submit">KAYDET</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
</script>
