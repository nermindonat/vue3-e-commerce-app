import axios from "axios";
import { defineStore } from "pinia";
import { Product } from "./products";

interface FavoriteProduct {
  id: number;
  productId: number;
  product: Product;
}

interface State {
  favoriteProducts?: FavoriteProduct[];
}

export const useFavoritesStore = defineStore("favoritesStore", {
  state: (): State => ({
    favoriteProducts: [],
  }),

  actions: {
    async fetchFavoriteProducts(token: string) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/favorites`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.favoriteProducts = response.data;
      } catch (error) {
        console.error("Error fetching favorite products", error);
      }
    },
  },
});
