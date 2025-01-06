import { defineStore } from "pinia";
import { Product } from "./products";

interface CartItem {
  cartId: null;
  productId: number;
  quantity: number;
  productDetail: Product;
}

interface State {
  cartItems: CartItem[];
}

export const useCartStore = defineStore("cartStore", {
  state: (): State => ({
    cartItems: [],
  }),

  getters: {
    totalQuantity(state): number {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },

  actions: {
    addToCart(product: Product) {
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
          productDetail: product,
        });
      }
      localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
    },

    increaseQuantity(productId: number) {
      const item = this.cartItems.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      }
    },

    decreaseQuantity(productId: number) {
      const item = this.cartItems.find((item) => item.productId === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      }
    },

    fetchCartItems() {
      const cartFromStorage = JSON.parse(
        localStorage.getItem("guestCart") ?? "[]"
      );
      this.cartItems = cartFromStorage;
    },
  },
});
