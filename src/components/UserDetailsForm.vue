<template>
  <div>
    <form action="">
      <label for="name">Name: </label>
      <input type="text" name="name" v-bind:value="userDetails.name" />
      <label for="email">Email: </label>
      <input type="email" name="email" v-bind:value="userDetails.email" />
      <label for="username">Username: </label>
      <input type="text" name="username" v-bind:value="userDetails.username" />
      <div v-if="userType == 'customer'">
        <label for="location">Location: </label>
        <select name="location" v-bind:value="userDetails.location">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>
      <div v-else>
        <label for="address">Address: </label>
        <textarea
          name="address"
          rows="2"
          cols="20"
          v-bind:value="userDetails.address"
        ></textarea>
        <label for="description">Description: </label>
        <textarea
          name="description"
          rows="2"
          cols="20"
          v-bind:value="userDetails.description"
        ></textarea>
      </div>
      <button type="submit">Submit Not Done D:</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: Object,
    userType: String,
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  margin-left: 20px;
}

button {
  margin: 20px;
  display: block;
}

input,
select,
textarea {
  font-weight: normal;
  margin-left: 20px;
}
</style>
