import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(() => {
  // Her yönlendirmeden sonra sayfanın en başına kaydırılmayı sağlar.
  window.scrollTo(0, 0);
});

export default router;
