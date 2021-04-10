<template>
  <div id="orderDets" class="card">
    <header class="card-header">
      <p class="card-header-title">Your Orders</p>
    </header>
    <div class="card-content">
      <b-table :data="allOrders" :focusable="true">
        <b-table-column field="id" label="Order ID" v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="listingID.name" label="Item" v-slot="props">
          {{ props.row.listingID.name }}
        </b-table-column>

        <b-table-column
          field="listingID.price"
          label="Price per Piece"
          v-slot="props"
        >
          ${{
            props.row.listingID.price.toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2 }),
          }}
        </b-table-column>

        <b-table-column
          field="deliveryMode"
          label="Delivery Mode"
          v-slot="props"
        >
          {{ props.row.deliveryMode }}
        </b-table-column>

        <b-table-column field="fulfilled" label="Fulfilled" v-slot="props">
          {{ convertFulfilled(props.row.fulfilled) }}
        </b-table-column>
      </b-table>
    </div>
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
  methods: {
    convertFulfilled: function (isFulfilled) {
      if (isFulfilled) {
        return "Yes";
      } else {
        return "No";
      }
    },
  },
};
</script>

<style scoped>
#orderDets {
  text-align: left;
  margin-left: 20px;
}
</style>
