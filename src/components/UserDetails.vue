<template>
  <div id="userDet">
    <div v-if="!isEdit">
      <user-details-list
        v-bind:userDetails="userDetails"
        v-bind:isCustomer="isCustomer"
      ></user-details-list>
      <b-button v-on:click="toggleForm">Update Details</b-button>
    </div>
    <div v-if="isEdit">
      <user-details-form
        v-bind:userDetails="userDetails"
        v-bind:isCustomer="isCustomer"
        v-bind:userId="userId"
      ></user-details-form>
      <b-button v-on:click="toggleForm">Cancel Changes</b-button>
    </div>
  </div>
</template>

<script>
import UserDetailsList from "../components/UserDetailsList.vue";
import UserDetailsForm from "../components/UserDetailsForm.vue";
export default {
  data() {
    return {
      isEdit: false,
    };
  },
  props: {
    userDetails: Object,
    isCustomer: Boolean,
    userId: {},
  },
  computed: {
    userData: function () {
      return this.$store.getters.getUserData;
    },
  },
  methods: {
    toggleForm: function () {
      this.isEdit = !this.isEdit;
    },
  },
  components: {
    UserDetailsList,
    UserDetailsForm,
  },
};
</script>

<style scoped>
#userDet {
  text-align: left;
}

button {
  margin: 20px;
  display: block;
}
</style>
