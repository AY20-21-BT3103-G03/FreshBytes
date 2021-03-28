<template>
  <div>
    <p>Name: {{ this.userDetails.name }}</p>
    <p>Email: {{ this.userDetails.email }}</p>
    <p>Username: {{ this.userDetails.username }}</p>
    <div v-if="isCustomer">
      <p>Points: {{ this.userDetails.points }}</p>
      <p>Location: {{ this.userDetails.location }}</p>
    </div>
    <div v-else>
      <p>Address: {{ this.userDetails.address }}</p>
      <p>Description: {{ this.userDetails.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: Object,
    isCustomer: Boolean,
  },
};
</script>

<style scoped>
p {
  font-weight: bold;
  margin-left: 20px;
}
</style>
