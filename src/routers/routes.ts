import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import MyOrders from "../views/MyOrders.vue";
import MyReviews from "../views/MyReviews.vue";
import MyDiscountCoupons from "../views/MyDiscountCoupons.vue";
import MyUserInformation from "../views/MyUserInformation.vue";
import ProductDetail from "../views/products/ProductDetail.vue";
import Favorite from "../views/Favorite.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import Cart from "../views/Cart.vue";

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
  {
    path: "/sifremi-unuttum",
    name: "Forgot Password",
    component: ForgotPassword,
  },
  {
    path: "/yeni-sifre-olustur",
    name: "Reset Password",
    component: ResetPassword,
  },
  {
    path: "/sepet",
    name: "Cart",
    component: Cart,
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
