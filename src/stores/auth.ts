import { defineStore } from "pinia";
import { computed } from "vue";
import axios from "axios";
import { useUsersStore } from "./users";

export const useAuthStore = defineStore("authStore", () => {
  const userStore = useUsersStore();
  const isAuth = computed(() => !!userStore.user);

  function setAuth(user: any, token: string) {
    userStore.user = user;
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
        const userInfoDetail = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/user-detail`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        userStore.user = userInfoDetail.data;
        setAuth(userInfoDetail.data, token);
      }
      return response.data;
    } catch (error) {
      console.error("Login işlemi sırasında hata oluştu:", error);
      throw error;
    }
  }

  return {
    isAuth,
    login,
    setAuth,
  };
});
