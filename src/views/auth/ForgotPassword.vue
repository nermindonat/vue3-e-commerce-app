<template>
  <div v-if="successMessage" class="w-[600px] justify-center mx-auto mt-14">
    <div class="flex flex-col items-center">
      <h2 class="text-lg font-bold">Şifreniz Gönderildi!</h2>
      <span class="mt-4">
        <span class="text-black font-bold">{{ emailShow }}</span>
        adresine şifre yenileme linki gönderildi.
      </span>
    </div>
    <div class="mt-10 p-10 border border-gray-200 rounded">
      <div class="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
        <Button type="submit">TEKRAR GÖNDER</Button>
      </div>
    </div>
  </div>
  <div v-else class="w-[600px] justify-center mx-auto mt-14">
    <div class="flex flex-col items-center">
      <h2 class="text-lg font-bold">Şifre Yenileme</h2>
      <span class="mt-4"
        >Şifre yenileme bağlantısını gönderebilmemiz için daha önce sisteme
        kayıt olduğunuz e-posta adresinize ihtiyacımız var.</span
      >
    </div>
    <div class="mt-10 p-10 border border-gray-200 rounded">
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
          <Button type="submit">ŞİFREMİ YENİLE</Button>
        </div>
        <div v-if="successMessage">
          <h2>Şifreniz Gönderildi</h2>
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

const successMessage = ref(false);
const emailShow = ref("");

const validationSchema = yup.object({
  email: yup.string().required("E-posta alanı zorunludur"),
});

const form = useForm({ validationSchema });
const { value: email, errorMessage: emailError } = useField("email");

const submitHandler = form.handleSubmit(async (values) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
      {
        email: values.email,
      }
    );
    if (response) {
      successMessage.value = true;
      emailShow.value = values.email;
    }
  } catch (error) {
    console.error("An error occurred while sending the link..", error);
  }
});
</script>
