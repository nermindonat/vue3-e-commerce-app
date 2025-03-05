import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

interface Customer  {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export const useAuthStore = defineStore("authStore", () => {
  const customer = ref<Customer | null>(null);
  const errorMessage = ref<string | null>(null);
  const isAuth = computed(() => !!customer.value);

  function setAuth(customerInfo: Customer, token: string) {
    customer.value = customerInfo;
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
        await fetchCustomerInfo(token);
        if (customer.value) {
          setAuth(customer.value, token);
        }
      }
      return response.data;
    } catch (error) {
      console.error("An error occurred during the login process.", error);
      throw error;
    }
  }

  async function fetchCustomerInfo(token: string) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/customer/customer-detail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      customer.value = response.data;
    } catch (error) {
      console.error(
        "An error occurred while fetching customer information.",
        error
      );
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("guestCart");
    customer.value = null;
  }

  function checkAuth() {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchCustomerInfo(token);
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
        error.response.data.message === "Customer with this email already exists"
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
    customer,
    login,
    setAuth,
    logout,
    checkAuth,
    register,
    errorMessage,
  };
});
