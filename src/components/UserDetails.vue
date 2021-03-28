<template>
  <div id="userDet">
    <h1 class="title is-5">Your User Details</h1>
    <div v-if="!isEdit">
      <user-details-list
        v-bind:userDetails="userDetails"
        v-bind:userType="userType"
      ></user-details-list>
      <button type="button" v-on:click="toggleForm">Change Details</button>
    </div>
    <div v-if="isEdit">
      <user-details-form
        v-bind:userDetails="userDetails"
        v-bind:userType="userType"
      ></user-details-form>
      <button type="button" v-on:click="toggleForm">Cancel Changes</button>
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
    userType: String,
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
  border: green solid 2px;
  text-align: left;
  padding: 10px;
}

button {
  margin: 20px;
  display: block;
}
</style>
