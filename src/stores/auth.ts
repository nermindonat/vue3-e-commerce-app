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
      console.error("Login işlemi sırasında hata oluştu:", error);
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
      console.error("Kullanıcı bilgilerini alırken hata oluştu:", error);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    user.value = null;
  }

  function checkAuth() {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserInfo(token);
    }
  }

  return {
    isAuth,
    user,
    login,
    setAuth,
    logout,
    checkAuth,
  };
});
