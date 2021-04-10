<template>
  <b-menu>
    <b-menu-list label="My Account">
      <b-menu-item
        icon="user"
        label="User Details"
        :active="isActive.details"
        id="details"
        v-on:click="swap"
      ></b-menu-item>
      <b-menu-item
        icon="shopping-basket"
        label="Orders"
        id="orders"
        v-on:click="swap"
      ></b-menu-item>
      <b-menu-item
        icon="chart-area"
        pack="fa"
        label="Dashboard"
        id="dashboard"
        v-on:click="swap"
      ></b-menu-item>
    </b-menu-list>
    <b-menu-list label="Actions">
      <b-menu-item label="Logout" v-on:click="logout"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  data() {
    return {
      isActive: {
        details: true,
      },
    };
  },
  methods: {
    /**
     * Emits a change-profile event to the Profile view parent component
     * @param {String} activeId the id of the element that sent the click event
     */
    emitChangeEvent: function (activeId) {
      this.$emit("change-profile", activeId);
    },

    /**
     * A wrapper function that handles everything once the sidebar is clicked
     * @param {Event} clickEvent A click event from the element.
     */
    swap: function (clickEvent) {
      // fixes bug where click event is on inner span instead
      if (clickEvent.target.id === "") {
        this.emitChangeEvent(clickEvent.target.parentElement.id);
      } else {
        this.emitChangeEvent(clickEvent.target.id);
      }
    },
    logout: function () {
      this.$store.commit("logout");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped></style>
