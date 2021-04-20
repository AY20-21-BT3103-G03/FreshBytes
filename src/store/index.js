import Vue from "vue";
import Vuex from "vuex";
import { firestoreAction, vuexfireMutations } from "vuexfire";
import { database } from "@/firebase/firebase";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    items: [],
    orders: [],
    user: {},
    isLoggedIn: false,
    cart: [],
    businesses: [],
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    isCustomer: (state) => state.user.isCustomer,
    getUser: (state) => state.user,
    getUsername: (state) => state.user.username,
    getUserId: (state) => state.user.id,
    getItems: (state) => state.items,
    getCart: (state) => state.cart,
    getCartCount: (state) => state.cart.length,
    getOrders: (state) => state.orders,
    getBusinesses: (state) => state.businesses,
  },
  mutations: {
    ...vuexfireMutations,
    login: (state, userData) => {
      state.user = userData;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      state.cart = [];
    },
    addToCart: (state, item) => {
      state.cart.push({
        ...item,
        currentQuantity: 1,
      });
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addItemToCart: (state, item) => {
      const index = state.cart.findIndex((x) => x.id === item.id);
      const cartItem = state.cart[index];

      state.cart.splice(index, 1, {
        ...cartItem,
        currentQuantity: cartItem.currentQuantity + 1,
      });
    },
    reduceItemFromCart: (state, item) => {
      const index = state.cart.findIndex((x) => x.id === item.id);
      const cartItem = state.cart[index];

      state.cart.splice(index, 1, {
        ...cartItem,
        currentQuantity: cartItem.currentQuantity - 1,
      });
    },
    removeItemFromCart: (state, item) => {
      state.cart = state.cart.filter((x) => x.id !== item.id);
    },
    updateUser: (state, userData) => {
      state.user = userData;
    },
  },
  actions: {
    bindItems: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("items", database.collection("items"));
    }),
    bindUserOrders: firestoreAction(({ state, bindFirestoreRef }) => {
      return bindFirestoreRef(
        "orders",
        database
          .collection("orders")
          .where("username", "==", state.user.username)
      );
    }),
    bindBusinessOrders: firestoreAction(({ state, bindFirestoreRef }) => {
      return bindFirestoreRef(
        "orders",
        database
          .collection("orders")
          .where("business", "==", state.user.username)
      );
    }),
    bindBusinesses: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        "businesses",
        database.collection("users").where("isCustomer", "==", false)
      );
    }),
  },
});
