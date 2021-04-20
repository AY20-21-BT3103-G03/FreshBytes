<template>
  <footer class="footer">
    <div class="columns">
      <div class="column is-one-third" align="left">
        <h1 class="title is-3">About Us</h1>
        <p>Fresh Bytes is a web-based application that</p>
        <p>aims to tackle issue of food wastage due to</p>
        <p>cosmetic filtering.</p>
        <br />
        <p>It provides a centralised platform to connect</p>
        <p>businesses and individuals</p>
      </div>
      <div class="column" align="left">
        <h1 class="title is-3">Support</h1>
        <p><b>Need Help:</b></p>
        <p>contact@freshbytes.com.sg</p>
        <br /><br />
        <p><b>Bulk Order:</b></p>
        <p>sales@freshbytes.com.sg</p>
      </div>
      <div class="column" align="left">
        <h1 class="title is-3">Newsletter</h1>
        <p>Subscribe to our newsletter!</p>
        <b-field>
          <b-input
            placeholder="Email"
            v-model="email"
            type="email"
            icon="inbox"
            icon-right="close-circle"
            icon-right-clickable
            @icon-right-click="clearIconClick"
          >
          </b-input>
        </b-field>
        <b-button type="is-primary" @click="toast" class="button"
          >Subscribe</b-button
        >
        <br /><br />
        <span><i class="fab fa-instagram"></i></span>
        <a href="https://www.instagram.com/freshest.bytes/"
          ><b>Follow us on Instagram!</b></a
        >
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: function () {
    return {
      email: "",
    };
  },
  methods: {
    toast: function () {
      this.$buefy.toast.open(
        "You have successfully subscribed to our newsletter!"
      );
    },
    clearIconClick: function () {
      this.email = "";
    },
  },
};
</script>

<style scoped>
.footer {
  margin-top: 100px;
}
</style>
