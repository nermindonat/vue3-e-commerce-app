import { defineStore } from "pinia";
import { Product, ProductVariant } from "./products";
import { useAuthStore } from "./auth";
import axios from "axios";

interface CartItem {
  id?: number;
  cartId: null | number;
  productId: number;
  productVariantId: number;
  quantity: number;
  product: Product;
  productVariant?: ProductVariant;
}
interface State {
  cartItems: CartItem[]; // localstorage taki verileri tutar
  backendCartItems: CartItem[]; // backend teki verileri tutar
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
      // Ürün id ve beden değerine göre gruplama yapıyoruz.
      const groupedItems = allItems.reduce((acc, currentItem) => {
        const productId = currentItem.product?.id;
        // Ürün varyantının beden değerini alın, örneğin currentItem.productVariant.variantValue.value
        const variantValue =
          currentItem.productVariant?.variantValue?.value || "";
        if (!productId) {
          return acc;
        }
        // Gruplama anahtarını oluşturuyoruz.
        const key = `${productId}-${variantValue}`;
        if (!acc[key]) {
          acc[key] = { ...currentItem };
        } else {
          acc[key].quantity += currentItem.quantity;
        }
        return acc;
      }, {} as { [key: string]: CartItem });

      return Object.values(groupedItems);
    },
  },

  actions: {
    async addToCart(product: Product, selectedValue: string) {
      const authStore = useAuthStore();
      const token = localStorage.getItem("access_token");
      // Varyant varsa, seçilen varyantı al, yoksa productVariantId null olarak gönder
      let productVariantId = null;
      let selectedVariant = null;

      if (product.productVariants && product.productVariants.length > 0) {
        selectedVariant = product.productVariants.find(
          (variant) => variant.variantValue.value === selectedValue
        );
        if (!selectedVariant) {
          console.error("Selected variant not found!");
          return;
        }
        productVariantId = selectedVariant.id;
      }
      // Sepete ekleme için ortak veri yapısı
      const cartData = {
        productId: product.id,
        productVariantId,
        quantity: 1,
      };

      // Kullanıcı giriş yapmışsa API üzerinden sepete ekle, değilse localStorage a ekle
      if (authStore.isAuth) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/cart-item`,
            cartData,
            {
              headers: { Authorization: `Bearer ${token}` },
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
          (item) =>
            item.productId === product.id &&
            item.productVariantId === productVariantId
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.cartItems.push({
            cartId: null,
            productId: product.id,
            productVariantId,
            quantity: 1,
            product: product,
            productVariant: selectedVariant,
          });
        }
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      }
    },

    async increaseQuantity(productId: number, productVariantId: number) {
      const authStore = useAuthStore();
      const token = localStorage.getItem("access_token");
      if (authStore.isAuth) {
        let existingCartItem = this.backendCartItems.find(
          (item) =>
            item.productId === productId &&
            item.productVariantId === productVariantId
        );
        if (!existingCartItem) {
          const localCartItem = this.cartItems.find(
            (item) =>
              item.productId === productId &&
              item.productVariantId === productVariantId
          );
          if (localCartItem) {
            const response = await axios.post(
              `${import.meta.env.VITE_API_BASE_URL}/cart-item`,
              {
                productId,
                productVariantId,
                quantity: localCartItem.quantity,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            existingCartItem = response.data;
            this.cartItems = this.cartItems.filter(
              (item) =>
                item.productId !== productId ||
                item.productVariantId !== productVariantId
            );
            localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
          } else {
            console.error("Cart item not found in guest cart!");
            return;
          }
        }
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/cart-item/${
            existingCartItem?.id
          }/increase`,
          {
            quantity: 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          await this.fetchCartItems();
        }
      } else {
        const existingItem = this.cartItems.find(
          (item) =>
            item.productId === productId &&
            item.productVariantId === productVariantId
        );
        if (existingItem) {
          existingItem.quantity += 1;
          localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
        } else {
          console.error("Cart item not found!");
        }
      }
    },

    async deleteOneItemFromCart(productId: number, productVariantId: number) {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Customer is not authenticated.");
        return;
      }
      const item = this.allCartItems.find(
        (item) =>
          item.productId === productId &&
          item.productVariantId === productVariantId
      );
      if (!item) {
        console.error(
          "Cart item not found for product id:",
          productId,
          "and variant id:",
          productVariantId
        );
        return;
      }
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/cart-item/${item.id}/decrease`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedItem = response.data;
        await this.fetchCartItems();
        const index = this.allCartItems.findIndex(
          (cartItem) => cartItem.id === item.id
        );
        if (index !== -1) {
          if (updatedItem.quantity > 0) {
            this.allCartItems[index].quantity = updatedItem.quantity;
          } else {
            this.allCartItems.splice(index, 1);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async deleteOneCartItemLocalstorage(
      productId: number,
      productVariantId: number
    ) {
      const guestItem = this.cartItems.find(
        (item) =>
          item.productId === productId &&
          item.productVariantId === productVariantId
      );
      if (!guestItem) {
        console.error(
          "Guest cart item not found for product id:",
          productId,
          "and variant id:",
          productVariantId
        );
        return;
      }

      if (guestItem.quantity > 1) {
        guestItem.quantity--;
      } else {
        const index = this.cartItems.findIndex(
          (item) =>
            item.productId === productId &&
            item.productVariantId === productVariantId
        );
        if (index > -1) {
          this.cartItems.splice(index, 1);
        }
      }
      try {
        localStorage.setItem("guestCart", JSON.stringify(this.cartItems));
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
    },

    async decreaseQuantity(productId: number, productVariantId: number) {
      const authStore = useAuthStore();
      if (authStore.isAuth) {
        await this.deleteOneItemFromCart(productId, productVariantId);
      } else {
        this.deleteOneCartItemLocalstorage(productId, productVariantId);
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
