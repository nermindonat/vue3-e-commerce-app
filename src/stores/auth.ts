import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const user = ref<User | null>(null);
  const errorMessage = ref<string | null>(null);
  const isAuth = computed(() => !!user.value);

  function setAuth(userInfo: User, token: string) {
    user.value = userInfo;
    localStorage.setItem("access_token", token);
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );
      const token = response.data.token;

      if (token) {
        await fetchUserInfo(token);
        if (user.value) {
          setAuth(user.value, token);
        }
      }
      return response.data;
    } catch (error) {
      console.error("An error occurred during the login process.", error);
      throw error;
    }
  }

  async function fetchUserInfo(token: string) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/user-detail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      user.value = response.data;
    } catch (error) {
      console.error(
        "An error occurred while fetching user information.",
        error
      );
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("guestCart");
    user.value = null;
  }

  function checkAuth() {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserInfo(token);
    }
  }

  async function register(
    name: string,
    surname: string,
    email: string,
    password: string
  ) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        { name, surname, email, password }
      );
      errorMessage.value = null;
      return response.data;
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.message === "User with this email already exists"
      ) {
        errorMessage.value = "Bu e-posta adresiyle zaten bir hesap mevcut.";
      }
      console.error(
        "An error occurred during the registration process.",
        error
      );
      throw error;
    }
  }

  return {
    isAuth,
    user,
    login,
    setAuth,
    logout,
    checkAuth,
    register,
    errorMessage,
  };
});
