import { defineStore } from "pinia";
import { Product } from "./products";
import { useAuthStore } from "./auth";
import axios from "axios";

interface CartItem {
  cartId: null | number;
  productId: number;
  quantity: number;
  product: Product;
}

interface State {
  cartItems: CartItem[];
  backendCartItems: CartItem[];
}

export const useCartStore = defineStore("cartStore", {
  state: (): State => ({
    cartItems: [],
    backendCartItems: [],
  }),

  getters: {
    totalQuantity(): number {
      return this.allCartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    totalQuantityLocalstorage(): number {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    allCartItems(state): CartItem[] {
      const allItems = state.backendCartItems.concat(state.cartItems);
      // 1. Quantity'leri product.id'ye göre grupla
      const groupedItems = allItems.reduce((acc, currentItem) => {
        const productId = currentItem.product.id;
        // Eğer bu product.id daha önce eklenmemişse yeni entry oluştur
        if (!acc[productId]) {
          acc[productId] = { ...currentItem };
        }
        // Eğer product.id zaten varsa quantity'yi topla
        else {
          acc[productId].quantity += currentItem.quantity;
        }

        return acc;
      }, {} as { [key: string]: CartItem }); // Tip güvenliği için type assertion

      // 2. Gruplanmış objeyi diziye çevir
      return Object.values(groupedItems);
    },
  },

  actions: {
    async addToCart(product: Product) {
      const authStore = useAuthStore();
      const token = localStorage.getItem("access_token");
      if (authStore.isAuth) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/cart-item`,
            {
              productId: product.id,
              quantity: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 201) {
            this.backendCartItems.push(response.data);
            await this.fetchCartItems();
          }
        } catch (error) {
          console.error("Error", error);
        }
      } else {
        const existingItem = this.cartItems.find(
          (item) => item.productId === product.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.cartItems.push({
            cartId: null,
            productId: product.id,
            quantity: 1,
            product: product,
          });
        }
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      }
    },

    increaseQuantity(productId: number) {
      const item = this.allCartItems.find(
        (item) => item.productId === productId
      );
      if (item) {
        item.quantity += 1;
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      }
    },

    decreaseQuantity(productId: number) {
      const item = this.allCartItems.find(
        (item) => item.productId === productId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      }
    },

    async fetchCartItems() {
      const authStore = useAuthStore();
      const token = localStorage.getItem("access_token");
      if (authStore.isAuth) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/cart-item`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          this.backendCartItems = response.data;
        } catch (error) {
          console.error(
            "Kullanıcı bilgileri alınırken bir hata oluştu.",
            error
          );
        }
      }
      await this.fetchCartItemsLocalstorage();
    },

    async fetchCartItemsLocalstorage() {
      const cartFromStorage = JSON.parse(
        localStorage.getItem("guestCart") ?? "[]"
      );
      this.cartItems = cartFromStorage;
    },
  },
});
