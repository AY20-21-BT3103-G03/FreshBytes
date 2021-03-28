<template>
  <div id="orderDets">
    <h1 class="title is-5">Your Past Orders</h1>
    <ul id="orderList">
      <li v-for="order in this.allOrders" :key="order.id">
        Order Number: {{ order.id }} | Item: {{ order.listingID.name }} |
        Quantity: {{ order.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    allOrders: {},
  },
  methods: {},
  created: function () {},
};
</script>

<style scoped>
#orderDets {
  text-align: left;
  border: blue solid 2px;
  padding: 10px;
}

#indiOrder {
  display: flex;
  flex-direction: row;

  border: red solid 2px;
}

#indiItem {
  text-align: left;
}
</style>
