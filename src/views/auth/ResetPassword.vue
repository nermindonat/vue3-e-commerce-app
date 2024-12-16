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
      <form @submit.prevent="submitHandler">
        <div
          v-if="invalidToken"
          class="text-[#d0021b] leading-[15px] p-[14px_20px_13px] mb-4 flex items-center border border-[#817274] rounded-md bg-[#fff4f6]"
        >
          Aktivasyon kodu geçersiz. Tekrar şifre sıfırlama isteğinde bulunun!
        </div>
        <div class="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          <Input
            type="password"
            name="newPassword"
            label="Yeni Şifre"
            v-model="newPassword"
            :errorMessage="newPasswordError"
            placeholder="Yeni Şifre"
            required
            progress
          />
          <Input
            type="password"
            name="newPasswordAgain"
            label="Yeni Şifre Tekrar"
            v-model="newPasswordAgain"
            :errorMessage="newPasswordAgainError"
            placeholder="Yeni Şifre Tekrar"
            required
          />
          <p
            v-if="passwordMatchError"
            class="text-red-500 text-sm font-semibold"
          >
            Şifreler birbiriyle eşleşmiyor.
          </p>
          <Button type="submit">KAYDET</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import * as yup from "yup";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const passwordMatchError = ref(false);
const invalidToken = ref(false);

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .required("Şifre alanı zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .matches(/[0-9]/, "Şifre en az bir rakam içermelidir")
    .matches(/[^a-zA-Z0-9]/, "Şifre en az bir özel karakter içermelidir"),
  newPasswordAgain: yup.string().required("Şifre alanı zorunludur"),
});

const form = useForm({ validationSchema });
const { value: newPassword, errorMessage: newPasswordError } =
  useField("newPassword");
const { value: newPasswordAgain, errorMessage: newPasswordAgainError } =
  useField("newPasswordAgain");

const submitHandler = form.handleSubmit(async (values) => {
  if (values.newPassword !== values.newPasswordAgain) {
    passwordMatchError.value = true;
  } else {
    try {
      const token = route.query.token;
      if (token) {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`,
          {
            newPassword: values.newPassword,
            newPasswordAgain: values.newPasswordAgain,
          }
        );
        if (response) {
          router.push("/giris-yap");
        }
      }
    } catch (error) {
      invalidToken.value = true;
      console.error("Invalid or expired reset token", error);
    }
  }
});
</script>
