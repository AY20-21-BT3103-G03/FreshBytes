<template>
  <div>
    <section class="hero is-small">
      <div class="hero-body">
        <img :src="ProfilePic" />
        <p class="title">
          {{ userDetails.name }}
        </p>
      </div>
    </section>

    <div id="empty"></div>

    <div class="columns">
      <div class="column is-2">
        <side-bar v-on:change-profile="changeDetails"></side-bar>
      </div>
      <div class="column">
        <div id="content">
          <user-details
            v-bind:userDetails="userDetails"
            v-bind:isCustomer="isCustomer"
            v-bind:userId="userId"
            v-if="toShow.details"
          ></user-details>
          <order-details
            v-bind:allOrders="allOrders"
            v-if="toShow.orders"
          ></order-details>
        </div>
      </div>
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
import ProfilePic from "../assets/img/profile.png";

export default {
  data() {
    return {
      userDetails: {},
      isCustomer: Boolean,
      allOrders: [],
      toShow: {
        details: true,
        orders: false,
        dashboard: false,
      },
      userId: String,
      ProfilePic: ProfilePic,
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

<style>
#content {
  padding: 1px 16px;
}

#empty {
  padding: 10px;
}

.hero {
  background-image: linear-gradient(#f5edd9, #f7d785);
}
</style>
