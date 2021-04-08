import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const store = new Vuex.Store({
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
    isLoggedIn: false,
    userData: {},
    products: [],
    cart: [],
  },
  mutations: {
    toggleLogin: function (state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    login: function (state, payload) {
      state.isLoggedIn = true;
      state.userData = payload;
    },
    logout: function (state) {
      state.isLoggedIn = false;
      state.userData = {};
      state.cart = [];
    },
    addToCart(state, payload) {
      const record = state.cart.find((product) => product.id == payload.id);
      console.log(record);
      if (!record) {
        const product = payload;
        product.cartQuantity = 1;
        state.cart.push(product);
      } else {
        record.cartQuantity++;
      }
    },
    setQuantity(state, payload) {
      const record = state.cart.find((product) => product.id === payload.id);
      record.cartQuantity = payload.newQuantity;
    },
    removeFromCart(state, payload) {
      const index = state.cart.findIndex((product) => product.id === payload);
      state.cart.splice(index, 1);
    },
  },
  getters: {
    categories: function (state) {
      return state.products;
    },
    product: function (state) {
      return (id) => {
        return state.products.filter((p) => p[0] === id);
      };
    },
    getCart: function (state) {
      return state.cart;
    },
    isLoggedIn: function (state) {
      return state.isLoggedIn;
    },
    getUserData: function (state) {
      return state.userData;
    },
    getUsername: function (state) {
      return state.userData.username;
    },
    getUserType: function (state) {
      return state.userData.isCustomer;
    },
  },
  modules: {},
});

export default store;
