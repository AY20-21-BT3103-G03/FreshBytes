<template>
  <div class="dashboard">
    <h1 class="title is-3">Dashboard</h1>
    <div class="tile is-ancestor is-vertical">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <h1 class="title is-5">Orders:</h1>
          <h1 class="subtitle is-4">142</h1>
        </div>
        <div class="tile is-child box">
          <h1 class="title is-5">Earnings:</h1>
          <h1 class="subtitle is-4">$1502</h1>
        </div>
        <div class="tile is-child box">
          <h1 class="title is-5">Number of Customers:</h1>
          <h1 class="subtitle is-4">103</h1>
        </div>
        <div class="tile is-child box">
          <h1 class="title is-5">Number of Impressions</h1>
          <h1 class="subtitle is-4">4234</h1>
        </div>
        <div class="tile is-child box">
          <h1 class="title is-5">Number of Clicks:</h1>
          <h1 class="subtitle is-4">512</h1>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child is-6 box">
          <h1 class="title is-5">Past 12 Months</h1>
          <trends-chart class="canvas" />
        </div>
        <div class="tile is-child is-3 box">
          <h1 class="title is-5">Most Sold Products</h1>
          <most-sold-products-chart class="canvas" />
        </div>
        <div class="tile is-child is-3 box">
          <h1 class="title is-5">Product Type</h1>
          <product-type-chart class="canvas" />
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child is-6 box">
          <h1 class="title is-5">Orders</h1>
          <orders-table-component />
        </div>
        <div class="tile is-child is-6 box">
          <h1 class="title is-5">Customers Type</h1>
          <customers-type-chart class="canvas" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MostSoldProductsChart from "./charts/business/MostSoldProductsChart";
import CustomersTypeChart from "./charts/business/CustomersTypeChart";
import ProductTypeChart from "./charts/business/ProductTypeChart";
import TrendsChart from "./charts/business/TrendsChart";
import OrdersTableComponent from "@/components/utils/OrdersTableComponent";

export default {
  components: {
    MostSoldProductsChart,
    CustomersTypeChart,
    TrendsChart,
    ProductTypeChart,
    OrdersTableComponent,
  },
  created: function () {
    this.$store.dispatch("bindBusinessOrders");
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto;
}

.canvas {
  width: 100% !important;
}
</style>
