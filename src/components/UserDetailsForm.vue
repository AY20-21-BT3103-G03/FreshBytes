<template>
  <div>
    <form action="">
      <b-field label="Name">
        <b-input :value="userDetails.name"></b-input>
      </b-field>
      <b-field label="Email">
        <b-input
          type="email"
          :value="userDetails.email"
          validation-message="This is not a valid email"
        ></b-input>
      </b-field>
      <b-field
        label="Username"
        :type="{ 'is-success': userNameAvailable }"
        :message="{ 'This username is available': userNameAvailable }"
      >
        <b-input :value="userDetails.username" maxlength="30"></b-input>
      </b-field>
      <div v-if="userType == 'customer'">
        <b-field label="Location">
          <b-select :value="userDetails.location">
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </b-select>
        </b-field>
      </div>
      <div v-else>
        <b-field label="Address">
          <b-input :value="userDetails.address"></b-input>
        </b-field>
        <b-field label="Description">
          <b-input
            maxlength="200"
            type="textarea"
            :value="userDetails.description"
          ></b-input>
        </b-field>
      </div>
      <button type="submit">Submit Not Done D:</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernameAvailable: false,
    };
  },
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
}

button {
  margin-top: 20px;
  display: block;
}

form {
  margin-left: 20px;
}
</style>
