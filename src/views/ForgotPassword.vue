<template>
  <div class="w-[600px] justify-center mx-auto mt-14">
    <div class="flex flex-col items-center">
      <h2 class="text-lg font-bold">Şifre Yenileme</h2>
      <span class="mt-4"
        >Şifre yenileme bağlantısını gönderebilmemiz için e-posta adresinize
        ihtiyacımız var.</span
      >
    </div>
    <div class="mt-10 p-10 border border-gray-200 rounded">
      <form>
        <div class="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          <Input
            name="email"
            label="E-Posta"
            placeholder="E-posta Adresi"
            required
          />
          <Button type="submit">ŞİFREMİ YENİLE</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
</script>
