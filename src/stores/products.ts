import axios from "axios";
import { defineStore } from "pinia";
import { object } from "yup";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface State {
  products?: Product[];
  selectedProductId: number;
  productDetail?: object;
}

export const useProductsStore = defineStore("productStore", {
  state: (): State => ({
    products: undefined,
    selectedProductId: 0,
    productDetail: object,
  }),

  actions: {
    async fetchAllProducts() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/product`
        );
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching product", error);
      }
    },

    async fetchProductById(selectedProductId: number) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/product/${selectedProductId}`
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
