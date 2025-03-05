import axios from "axios";
import { defineStore } from "pinia";

interface State {
  customer?: [];
}

export const useCustomersStore = defineStore("customerStore", {
  state: (): State => ({
    customer: undefined,
  }),

  actions: {
    async fetchCustomers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/customer`
        );
        this.customer = response.data;
      } catch (error) {
        console.error("Error fetching customers", error);
      }
    },
  },
  getters: {
    getCustomers(state) {
      return state.customer;
    },
  },
});
