import axios from "axios";
import { defineStore } from "pinia";

interface State {
  user?: [];
}

export const useUsersStore = defineStore("userStore", {
  state: (): State => ({
    user: undefined,
  }),

  actions: {
    async fetchUsers() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user`
        );
        console.log(response);

        this.user = response.data;
      } catch (error) {
        console.error("Error fetching users", error);
      }
    },
  },
});
