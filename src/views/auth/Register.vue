<template>
  <div class="w-[400px] justify-center mx-auto mt-10">
    <div class="flex flex-col items-center">
      <h2 class="text-lg font-semibold">Merhaba,</h2>
      <span>N&D'ye üye ol, fırsatlardan yararlan!</span>
    </div>
    <div class="mt-5 p-5 border border-gray-200 rounded">
      <h2 class="flex items-center justify-center text-lg font-semibold mb-4">
        Üye Ol
      </h2>
      <form @submit.prevent="submitHandler">
        <div class="grid w-full grid-cols-1 md:grid-cols-1 gap-4">
          <div class="grid w-full grid-cols-2 md:grid-cols-2 gap-4">
            <Input
              name="name"
              label="Ad"
              v-model="name"
              :errorMessage="nameError"
              placeholder="Ad"
              required
            />
            <Input
              name="surname"
              label="Soyad"
              v-model="surname"
              :errorMessage="surnameError"
              placeholder="Soyad"
              required
            />
          </div>
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
            :errorMessage="passwordError"
            placeholder="Şifre"
            required
            progress
          />
          <div
            v-if="errorMessageShow || successMessage"
            :class="[successMessage ? 'text-green-500' : 'text-red-500']"
          >
            {{
              successMessage
                ? "Başarılı bir şekilde üye oldunuz! Giriş sayfasına yönlendiriliyorsunuz..."
                : errorMessageShow
            }}
          </div>
          <Button type="submit">ÜYE OL</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from "yup";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import { useField, useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { ref } from "vue";

const router = useRouter();
const authStore = useAuthStore();
const errorMessageShow = ref<string | null>(null);
const successMessage = ref(false);

const validationSchema = yup.object({
  name: yup.string().required("Ad alanı zorunludur"),
  surname: yup.string().required("Soyad alanı zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir E-posta adresi giriniz")
    .required("E-posta alanı zorunludur"),
  password: yup
    .string()
    .required("Şifre alanı zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .matches(/[0-9]/, "Şifre en az bir rakam içermelidir")
    .matches(/[^a-zA-Z0-9]/, "Şifre en az bir özel karakter içermelidir"),
});

const form = useForm({ validationSchema });
const { value: name, errorMessage: nameError } = useField("name");
const { value: surname, errorMessage: surnameError } = useField("surname");
const { value: email, errorMessage: emailError } = useField("email");
const { value: password, errorMessage: passwordError } = useField("password");

const submitHandler = form.handleSubmit(async (values) => {
  try {
    const response = await authStore.register(
      values.name,
      values.surname,
      values.email,
      values.password
    );
    if (response) {
      successMessage.value = true;
      setTimeout(() => {
        router.push("/giris-yap");
      }, 3000);
    }
  } catch (error) {
    if (authStore.errorMessage) {
      errorMessageShow.value = authStore.errorMessage;
    }
  }
});
</script>
