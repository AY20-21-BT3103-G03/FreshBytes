<template>
  <div v-if="userDetails">
    <h1 class="title is-3">{{ userDetails.name }}'s Profile Page</h1>
    <side-bar v-on:change-profile="changeDetails"></side-bar>
    <div id="content">
      <user-details
        v-bind:userDetails="userDetails"
        v-bind:isCustomer="isCustomer"
        v-if="toShow.details"
      ></user-details>
      <order-details
        v-bind:allOrders="allOrders"
        v-if="toShow.orders"
      ></order-details>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar.vue";
import OrderDetails from "../components/OrderDetails.vue";
import UserDetails from "../components/UserDetails.vue";
import {
  getUserDetails,
  getUserOrdersWithListing,
} from "../database/queries.js";

export default {
  data() {
    return {
      userDetails: null,
      isCustomer: Boolean,
      allOrders: [],
      toShow: {
        details: true,
        orders: false,
        dashboard: false,
      },
      userId: String,
    };
  },
  methods: {
    /**
     * Changes the displayed element in the profile page based on a click on the sidebar
     */
    changeDetails: function (event) {
      for (const property in this.toShow) {
        this.toShow[property] = property == event ? true : false;
      }
    },
  },
  components: {
    SideBar,
    UserDetails,
    OrderDetails,
  },
  created: function () {
    const username = this.$store.getters.getUsername;
    this.isCustomer = this.$store.getters.getUserType;
    getUserDetails(username, this.isCustomer).then((doc) => {
      this.userDetails = doc.data();
      this.userId = doc.id;

      getUserOrdersWithListing(this.isCustomer, doc.id).then((orders) => {
        this.allOrders = orders;
      });
    });
  },
};
</script>

<style scoped>
#content {
  margin-left: 200px;
  padding: 1px 16px;
}
</style>
