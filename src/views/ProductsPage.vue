<template>
  <div class="products">
    <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
    <div v-if="isCustomer">
      <h1 class="title is-3">Welcome to our awesome Market</h1>
      <h1 class="subtitle is-5">Below you will find our latest products!</h1>
    </div>
    <div v-else>
      <h1 class="title is-3">All Products</h1>
    </div>
    <div class="columns">
      <div class="column is-one-fifth filter">
        <b-field :label="currentFilteredPrice">
          <b-slider v-model="filterPrice" :min="0" :max="50"></b-slider>
        </b-field>
        <hr />
        <div class="block">
          <b-field label="Product Category" class="checkbox">
            <b-checkbox v-model="filterType" native-value="UglyFood">
              Ugly Food
            </b-checkbox>
            <b-checkbox v-model="filterType" native-value="Product">
              Product
            </b-checkbox>
          </b-field>
        </div>
        <hr />
        <b-field label="Filter">
          <b-input placeholder="Search Product" v-model="filterName" />
        </b-field>
        <hr />
        <b-field label="Company" class="block">
          <b-checkbox
            v-for="business in getBusinessNames"
            :key="business.name"
            v-model="filterCompany"
            :native-value="business.username"
          >
            {{ business.name }}
          </b-checkbox>
        </b-field>
      </div>
      <transition-group name="list" tag="p" class="column items">
        <product-card-component
          v-for="item in getFilteredItems"
          :key="item.id"
          :product="item"
          class="list-item"
          @addToCart="addToCart"
        />
      </transition-group>
    </div>
    <go-top
      fg-color="#808080"
      bg-color="#ffffff00"
      box-shadow="0px 0px 0px rgba(0, 0, 0, 0)"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCardComponent from "@/components/products/ProductCardComponent";
import GoTop from "@inotom/vue-go-top";

export default {
  components: {
    ProductCardComponent,
    GoTop,
  },
  data: function () {
    return {
      isLoading: true,
      filterPrice: 50,
      filterType: [],
      filterName: "",
      filterCompany: [],
    };
  },
  computed: {
    ...mapGetters(["isCustomer", "getItems", "getCart", "getBusinesses"]),
    currentFilteredPrice: function () {
      return "Max Price: $" + this.filterPrice;
    },
    getFilteredItems: function () {
      return this.getItems.filter((item) => {
        const validQuantity = item.quantity > 0;
        const validPrice = item.price < this.filterPrice;
        const validType =
          this.filterType.length === 0 || this.filterType.includes(item.type);
        const validName = item.name.includes(this.filterName);
        const validCompany =
          this.filterCompany.length === 0 ||
          this.filterCompany.includes(item.business);

        return (
          validQuantity && validPrice && validType && validName && validCompany
        );
      });
    },
    getBusinessNames: function () {
      return this.getBusinesses.map((b) => {
        return {
          name: b.name,
          username: b.username,
        };
      });
    },
  },
  created: function () {
    this.$store.dispatch("bindBusinesses").then(() => {
      this.isLoading = false;
    });
  },
  methods: {
    addToCart: function (item) {
      if (this.getCart.filter((x) => x.id === item.id).length > 0) {
        this.$buefy.snackbar.open({
          message: "You have already added this item to the cart!",
          type: "is-danger",
          position: "is-top",
          duration: 800,
        });
        return;
      }

      this.$buefy.snackbar.open({
        message: item.name + " added to cart!",
        type: "is-success",
        position: "is-top",
        duration: 800,
      });

      this.$store.commit("addToCart", {
        ...item,
        id: item.id,
      });
    },
  },
};
</script>

<style scoped>
.columns {
  padding: 40px;
}

.checkbox {
  align-items: center;
}

.filter {
  background-color: whitesmoke;
  padding: 30px;
  height: 100vh;
  margin-right: 20px;
}

.items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 0;
  height: auto;
  margin: 0 auto auto auto;
}

hr {
  background-color: lightgrey;
}

.list-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-enter, .list-leave-to
/* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
