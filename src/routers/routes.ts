import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ProductDetail from "../views/products/ProductDetail.vue";
import Favorite from "../views/Favorite.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import Cart from "../views/cart/Cart.vue";
import Payment from "../views/payment/Payment.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/giris-yap",
    name: "login",
    component: Login,
  },
  {
    path: "/uye-ol",
    name: "register",
    component: Register,
  },
  {
    path: "/urun/:name",
    name: "product-detail",
    component: ProductDetail,
  },
  {
    path: "/favorilerim",
    name: "favorite",
    component: Favorite,
  },
  {
    path: "/sifremi-unuttum",
    name: "forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/yeni-sifre-olustur",
    name: "reset-password",
    component: ResetPassword,
  },
  {
    path: "/sepet",
    name: "cart",
    component: Cart,
  },
  {
    path: "/sepetim/odeme",
    name: "payment",
    component: Payment,
  },
  {
    path: "/hesabim",
    component: () => import("../views/account/Account.vue"),
    children: [
      {
        path: "",
        redirect: "/hesabim/kullanici-bilgileri",
      },
      {
        path: "kullanici-bilgileri",
        name: "profile",
        component: () => import("../views/account/Profile.vue"),
      },
      {
        path: "adres-bilgileri",
        name: "addresses",
        component: () => import("../views/account/Addresses.vue"),
      },
    ],
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
