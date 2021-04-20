<template>
  <b-navbar spaced>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'main' }">
        <img src="@/assets/img/FreshBytesLogo.png" />
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'main' }">
        <b-icon pack="fas" icon="home" size="is-medium"> </b-icon>
        <span>Home</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'faq' }">
        <b-icon pack="fas" icon="question" size="is-medium"> </b-icon>
        <span>FAQ</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'partners' }">
        <b-icon pack="fas" icon="handshake" size="is-medium"> </b-icon>
        <span>Partner Businesses</span>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="router-link" :to="{ name: 'products' }">
        <b-icon pack="fas" icon="utensils" size="is-medium"> </b-icon>
        <span>Products</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'profile' }">
        <b-icon pack="fas" icon="user" size="is-medium"> </b-icon>
        <span>Profile</span>
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'dashboard' }">
        <b-icon pack="fas" icon="chart-line" size="is-medium"> </b-icon>
        <span>Dashboard</span>
      </b-navbar-item>
      <b-navbar-item v-if="isCustomer" tag="router-link" :to="{ name: 'cart' }">
        <div class="cartcount" v-if="getCartCount > 0">{{ getCartCount }}</div>
        <b-icon icon="shopping-cart" style="margin-right: 3px" />
        Cart
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary" @click="logout">
            <strong>Logout</strong>
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn", "isCustomer", "getCartCount"]),
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push({ name: "main" });
    },
  },
};
</script>

<style>
.cartcount {
  position: absolute;
  background: #ff2211;
  color: white;
  text-align: center;
  padding-top: 2px;
  height: 18px;
  width: 18px;
  font-size: 10px;
  margin: -8px 0 0 8px;
  border-radius: 50%;
  font-weight: 700;
}
</style>
