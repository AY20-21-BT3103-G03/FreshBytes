<template>
  <div class="modal-card" style="width: auto">
    <div class="modal-card-head">
      <p class="modal-card-title">{{ product.name }}</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </div>
    <div class="modal-card-body">
      <img :src="product.image" />
      <div class="details">
        <h1 class="title is-5">Sold by: {{ businessName }}</h1>
        <p>Price: ${{ price }}</p>
        <p>Original Price: ${{ originalPrice }}</p>
        <p>
          You will save
          <b> ${{ priceSaved }} </b>!
        </p>
        <p>Description: {{ product.description }}</p>
        <p>
          <em
            ><b>{{ product.quantity }}</b> left in stock</em
          >
        </p>
      </div>
      <div class="other-details">
        <h4 class="title is-4">Other Details:</h4>
        <p>Weight: {{ product.weight }} kg</p>
        <p>Best Before: {{ bestBefore }}</p>
      </div>
      <footer class="modal-card-footer" v-if="isCustomer">
        <b-button class="is-primary" @click="addToCart">Add to Cart</b-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isCustomer", "getBusinesses"]),
    price: function () {
      return parseFloat(this.product.price).toFixed(2);
    },
    originalPrice: function () {
      return parseFloat(this.product.originalPrice).toFixed(2);
    },
    priceSaved: function () {
      return parseFloat(
        this.product.originalPrice - this.product.price
      ).toFixed(2);
    },
    bestBefore: function () {
      return new Date(this.product.bestBefore.toDate()).toDateString();
    },
    collectionMethods: function () {
      return this.product.collection.reduce((a, b) => a + ", " + b);
    },
    businessName: function () {
      return this.getBusinesses.find(
        (x) => x.username === this.product.business
      ).name;
    },
  },
  methods: {
    addToCart: function () {
      this.$emit("addToCart");
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-card-head {
  text-align: left;
}

img {
  max-width: 300px;
  max-height: 200px;
  object-fit: cover;
}

.details {
  margin: 20px 0;
}

.other-details {
  margin-bottom: 20px;
}
</style>
