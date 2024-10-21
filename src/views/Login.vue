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
import axios from "axios";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";

const router = useRouter();

const validationSchema = yup.object({
  email: yup.string().required("E-posta alanı zorunludur"),
  password: yup.string().required("Şifre alanı zorunludur"),
});

const form = useForm({ validationSchema });
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("email");

const submitHandler = form.handleSubmit(async (values) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      {
        email: values.email,
        password: values.password,
      }
    );
    if (response) {
      console.log(response.data);
      router.push("/");
    }
  } catch (error) {
    console.error("From gönderilirken hata oluştu.", error);
  }
});
</script>
