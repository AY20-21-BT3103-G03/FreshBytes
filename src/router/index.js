import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index.js";

import MainPage from "@/views/MainPage";
import ProductsPage from "@/views/ProductsPage";
import ProfilePage from "@/views/ProfilePage";
import CartPage from "@/views/CartPage";
import DashboardPage from "@/views/DashboardPage";
import FAQ from "@/views/FAQ";
import CompleteCheckoutPage from "@/views/CompleteCheckoutPage";
import PartnerBusiness from "@/views/PartnerBusiness";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsPage,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
  },
  {
    path: "/faq",
    name: "faq",
    component: FAQ,
  },
  {
    path: "/partners",
    name: "partners",
    component: PartnerBusiness,
  },
  {
    path: "/completeCheckout",
    name: "completeCheckout",
    component: CompleteCheckoutPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Strict pages
const customerPages = ["cart", "completeCheckout"];
const businessPages = ["listings"];

// Login Guard
router.beforeEach((to, from, next) => {
  if (to.name === from.name) return;

  const isLoggedIn = store.getters.isLoggedIn;

  if (to.name === "main") {
    return next();
  }

  if (!isLoggedIn) {
    return next({ name: "main" });
  }

  const isCustomer = store.getters.isCustomer;

  if (customerPages.includes(to.name) && !isCustomer) {
    return next({ name: "main" });
  }

  if (businessPages.includes(to.name) && isCustomer) {
    return next({ name: "main" });
  }

  return next();
});

export default router;
