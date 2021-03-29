<template>
  <div id="orderDets">
    <h1 class="title is-5">Your Past Orders</h1>
    <b-table :data="allOrders" focusable="true">
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

      <b-table-column field="deliveryMode" label="Delivery Mode" v-slot="props">
        {{ props.row.deliveryMode }}
      </b-table-column>

      <b-table-column field="fulfilled" label="Fulfilled" v-slot="props">
        {{ convertFulfilled(props.row.fulfilled) }}
      </b-table-column>
    </b-table>
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
