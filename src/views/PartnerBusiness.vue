<template>
  <div>
    <section>
      <img src="@/assets/img/FreshBytesLogo.png" width="300px" height="300px" />
      <h1 class="title is-3" align="left">Our Partner Businessses</h1>
      <h1 class="subtitle is-5" align="left">
        We thank our partner businesses who work hand in hand with us to create
        change and reduce waste in Singapore. Find out more about these
        home-grown businesses here!
      </h1>
      <partner-component
        v-for="biz in getBusinessNames"
        :key="biz.username"
        :partner="biz"
      >
      </partner-component>
      <div v-for="biz in getBusinessNames" :key="biz.name"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PartnerComponent from "@/components/partners/PartnerComponent";

export default {
  components: {
    PartnerComponent,
  },
  computed: {
    ...mapGetters(["isCustomer", "getItems", "getCart", "getBusinesses"]),
    currentFilteredPrice: function () {
      return "Max Price: $" + this.filterPrice;
    },
    getBusinessNames: function () {
      return this.getBusinesses.map((b) => {
        return {
          name: b.name,
          username: b.username,
          description: b.description,
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
