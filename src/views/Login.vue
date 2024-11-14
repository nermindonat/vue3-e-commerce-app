<template>
  <div class="w-[400px] justify-center mx-auto mt-10">
    <div class="flex flex-col items-center">
      <h2 class="text-lg font-semibold">Merhaba,</h2>
      <span>N&D hesabına giriş yap, alışverişe başla!</span>
    </div>
    <div class="mt-5 p-5 border border-gray-200 rounded">
      <h2 class="flex items-center justify-center text-lg font-semibold mb-4">
        Giriş Yap
      </h2>
      <form @submit.prevent="submitHandler">
        <div
          v-if="showErrorMessage"
          class="text-[#d0021b] leading-[15px] p-[14px_20px_13px] mb-4 flex items-center border border-[#817274] rounded-sm bg-[#fff4f6]"
        >
          E-posta adresiniz veya şifreniz hatalı.
        </div>
        <div class="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          <Input
            name="email"
            label="E-Posta"
            v-model="email"
            :errorMessage="emailError"
            placeholder="E-posta Adresi"
            required
          />
          <Input
            type="password"
            name="password"
            label="Şifre"
            v-model="password"
            :errorMmessage="passwordError"
            placeholder="Şifre"
            required
          />
          <Button type="submit">GİRİŞ YAP</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useFavoritesStore } from "../stores/favorites";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const favoritesStore = useFavoritesStore();
const showErrorMessage = ref(false);

const validationSchema = yup.object({
  email: yup.string().required("E-posta alanı zorunludur"),
  password: yup.string().required("Şifre alanı zorunludur"),
});

const form = useForm({ validationSchema });
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const submitHandler = form.handleSubmit(async (values) => {
  try {
    await authStore.login(values.email, values.password);
    router.push("/");
    const token = localStorage.getItem("access_token");
    if (token) {
      await favoritesStore.fetchFavoriteProducts(token);
    }
  } catch (error) {
    showErrorMessage.value = true;
    console.error("Giriş yaparken bir hata oluştu.", error);
  }
});
</script>
