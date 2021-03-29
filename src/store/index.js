import Vue from "vue";
import Vuex from "vuex";
import db from "../database/firebase.js";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

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
    userData: {
      username: "",
      isCustomer: null,
    },
    products: [],
    cart: [],
  },
  mutations: {
    setCategories: function (state, val) {
      state.products = val;
    },
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
    },
    addToCart(state, { id }) {
      const record = state.cart.find((p) => p.id === id);
      if (!record) {
        state.cart.push({
          id,
          quantity: 1,
        });
      } else {
        record.quantity++;
      }
    },
    setQuantity(state, { id, value }) {
      const record = state.cart.find((p) => p.id === id);
      record.quantity = value;
    },
    removeFromCart(state, { id }) {
      const index = state.cart.findIndex((p) => p.id === id);
      state.cart.splice(index, 1);
    },
  },
  actions: {
    fetchCategories({ commit }) {
      db.collection("items")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("cannot find");
            this.$router.push("/HelloWorld");
          } else {
            let product = {};
            this.loading = false;
            var products = [];
            querySnapshot.forEach((doc) => {
              product = [doc.id, doc.data()];
              products.push(product);
            });

            commit("setCategories", products);
          }
        });
    },
    addToCart(context, id) {
      context.commit("addToCart", { id: id });
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
    cart: function (state) {
      return state.cart.map(({ id, quantity }) => {
        const product = state.products.find((p) => p[0] === id);
        return {
          id: product[0],
          name: product[1].name,
          price: product[1].price,
          originalPrice: product[1].originalPrice,
          picture: product[1].picture,
          stockQuantity: product[1].quantity,
          quantity,
        };
      });
    },
    isLoggedIn: function (state) {
      return state.isLoggedIn;
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

store.dispatch("fetchCategories");
export default store;
