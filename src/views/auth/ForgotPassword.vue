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
        <Button
          type="submit"
          :disabled="isCountdownActive"
          @click="resendHandler"
          >TEKRAR GÖNDER {{ countdownShow }}</Button
        >
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
          <div v-if="errorMessage" class="text-red-500 font-semibold text-sm">
            <span>Bu e-posta adresi için kullanıcı bulunamadı.</span>
          </div>
          <Button type="submit">ŞİFREMİ YENİLE</Button>
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
const errorMessage = ref(false);
const emailShow = ref("");
const countdown = ref(0);
const isCountdownActive = ref(false);
const countdownShow = ref("(3.00)");

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
      startCountdown();
    }
  } catch (error) {
    errorMessage.value = true;
    console.error("An error occurred while sending the link.", error);
  }
});

const resendHandler = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`,
      {
        email: emailShow.value,
      }
    );
    if (response) {
      startCountdown();
    }
  } catch (error) {
    console.error("An error occurred while resending the link.", error);
  }
};

const startCountdown = () => {
  countdown.value = 180;
  isCountdownActive.value = true;

  const interval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
      const minutes = Math.floor(countdown.value / 60);
      const seconds = countdown.value % 60;
      countdownShow.value = `(${minutes}:${seconds
        .toString()
        .padStart(2, "0")})`;
    } else {
      clearInterval(interval);
      isCountdownActive.value = false;
      countdownShow.value = "";
    }
  }, 1000);
};
</script>
