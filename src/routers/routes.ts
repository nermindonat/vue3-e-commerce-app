import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import MyOrders from "../views/MyOrders.vue";
import MyReviews from "../views/MyReviews.vue";
import MyDiscountCoupons from "../views/MyDiscountCoupons.vue";
import MyUserInformation from "../views/MyUserInformation.vue";
import ProductDetail from "../views/products/ProductDetail.vue";
import Favorite from "../views/Favorite.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/giris-yap",
    name: "Login",
    component: Login,
  },
  {
    path: "/uye-ol",
    name: "Register",
    component: Register,
  },
  {
    path: "/siparislerim",
    name: "Orders",
    component: MyOrders,
  },
  {
    path: "/degerlendirmelerim",
    name: "Reviews",
    component: MyReviews,
  },
  {
    path: "/indirim-kuponlarim",
    name: "Discount Coupons",
    component: MyDiscountCoupons,
  },
  {
    path: "/kullanici-bilgilerim",
    name: "User Information",
    component: MyUserInformation,
  },
  {
    path: "/urun/:name",
    name: "Product Detail",
    component: ProductDetail,
  },
  {
    path: "/favorilerim",
    name: "Favorite",
    component: Favorite,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
