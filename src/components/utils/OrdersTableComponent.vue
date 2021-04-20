<template>
  <div>
    <b-table :data="paginatedItems" :columns="columns">
      <template #empty>
        <div class="has-text-centered">No records</div>
      </template>
    </b-table>
    <b-pagination
      :total="total"
      :per-page="perPage"
      v-model="current"
      v-if="requiresPagination"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: function () {
    return {
      columns: [
        { field: "orderId", label: "Order ID" },
        { field: "productName", label: "Product" },
        { field: "username", label: "User" },
        { field: "originalPrice", label: "Original Price" },
        { field: "price", label: "Price" },
        { field: "quantity", label: "Quantity" },
      ],
      current: 1,
      perPage: 5,
    };
  },
  created: function () {
    console.log(this.paginatedItems.length);
  },
  computed: {
    ...mapGetters(["getOrders"]),
    total: function () {
      return this.getOrders.length;
    },
    requiresPagination: function () {
      return this.getOrders.length > 5;
    },
    paginatedItems: function () {
      const pageNumber = this.current - 1;
      return this.getOrders.slice(
        pageNumber * this.perPage,
        (pageNumber + 1) * this.perPage
      );
    },
  },
};
</script>

<style></style>
