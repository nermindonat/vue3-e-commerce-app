import axios from "axios";
import { defineStore } from "pinia";

// Variant ile ilgili arayüz
export interface Variant {
  id: number;
  name: string;
}

// VariantValue arayüzü, varyantın değerini tutar (örneğin "M", "L")
export interface VariantValue {
  id: number;
  value: string;
  variant: Variant;
}

// Ürün varyantı bilgileri
export interface ProductVariant {
  id: number;
  productId: number;
  variantValueId: number;
  variantValue: VariantValue;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  productVariants: ProductVariant[];
}

interface State {
  products?: Product[];
  selectedProductId: number;
  productDetail?: Product;
}

export const useProductsStore = defineStore("productStore", {
  state: (): State => ({
    products: undefined,
    selectedProductId: 0,
    productDetail: undefined,
  }),

  actions: {
    async fetchAllProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products`
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching product", error);
      }
    },

    async fetchProductById(selectedProductId: number) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/${selectedProductId}`
        );
        this.productDetail = response.data;
        this.selectedProductId = selectedProductId;
      } catch (error) {
        console.error("Error fetching product by id", error);
      }
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    },
    getProductDetail(state) {
      return state.productDetail;
    },
  },
});
