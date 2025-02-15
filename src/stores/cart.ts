import { defineStore } from "pinia";
import { Product } from "./products";
import { useAuthStore } from "./auth";
import axios from "axios";

interface CartItem {
  id?: number;
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
        const productId = currentItem.product?.id;
        if (!productId) {
          return acc;
        }
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

    async deleteOneItemFromCart(productId: number) {
      const token = localStorage.getItem("access_token");
      const item = this.backendCartItems.find(
        (item) => item.productId === productId
      );
      if (!item) {
        console.error("Cart item not found for product id:", productId);
        return;
      }
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/cart-item/one/${item.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedItem = response.data;

        if (updatedItem.quantity < item.quantity) {
          const index = this.backendCartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );
          if (index !== -1) {
            this.backendCartItems[index].quantity = updatedItem.quantity;
          }
        }
      } catch (error) {
        console.error("Error", error);
      }
    },

    async deleteOneCartItemLocalstorage(productId: number) {
      const guestItem = this.cartItems.find(
        (item) => item.productId === productId
      );
      if (!guestItem) {
        console.error("Guest cart item not found for product id:", productId);
        return;
      }
      if (guestItem.quantity > 1) {
        guestItem.quantity--;
      } else {
        console.error(
          "Quantity is already at the minimum (1), cannot decrease further."
        );
      }
      localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
    },

    async increaseQuantity(productId: number) {
      const item = this.allCartItems.find(
        (item) => item.productId === productId
      );
      if (item) {
        await this.addToCart(item.product);
      } else {
        console.error("Product not found for id:", productId);
      }
    },

    async decreaseQuantity(productId: number) {
      const authStore = useAuthStore();
      authStore.isAuth
        ? await this.deleteOneItemFromCart(productId)
        : this.deleteOneCartItemLocalstorage(productId);
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
          console.error("An error occurred while fetching cart items.", error);
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
