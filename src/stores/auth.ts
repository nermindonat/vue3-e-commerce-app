import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("authStore", () => {
  function setAuth(token: string) {
    localStorage.setItem("auth_token", token);
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
        setAuth(token);
      }
      return response.data;
    } catch (error) {
      console.error("Login işlemi sırasında hata oluştu:", error);
      throw error;
    }
  }

  return {
    login,
    setAuth,
  };
});
