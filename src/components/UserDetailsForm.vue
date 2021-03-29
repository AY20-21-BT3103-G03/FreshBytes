<template>
  <div id="form">
    <b-field label="Name">
      <b-input :value="userDetails.name" class="data" name="name"></b-input>
    </b-field>
    <b-field label="Email">
      <b-input
        class="data"
        name="email"
        type="email"
        :value="userDetails.email"
        validation-message="This is not a valid email"
      ></b-input>
    </b-field>
    <div v-if="isCustomer">
      <b-field label="Location">
        <b-select :value="userDetails.location" class="data" name="location">
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </b-select>
      </b-field>
    </div>
    <div v-else>
      <b-field label="Address">
        <b-input
          :value="userDetails.address"
          class="data"
          name="address"
        ></b-input>
      </b-field>
      <b-field label="Description">
        <b-input
          class="data"
          name="description"
          maxlength="200"
          type="textarea"
          :value="userDetails.description"
        ></b-input>
      </b-field>
    </div>
    <button v-on:click="changeUserDet">Submit</button>
  </div>
</template>

<script>
import { getUserDetailsDocRef, updateFromDocRef } from "../database/queries";
export default {
  props: {
    userDetails: Object,
    isCustomer: Boolean,
    userId: String,
  },
  methods: {
    changeUserDet: function () {
      let updateData = {};
      let allFields = document.getElementsByClassName("data");
      let length = allFields.length;
      for (let i = 0; i < length; i++) {
        let element = allFields.item(i).firstChild;
        // get the correct child element
        while (element.name == undefined) {
          element = element.firstChild;
        }
        let name = element.name;
        let value = element.value;
        if (Object.prototype.hasOwnProperty.call(this.userDetails, name)) {
          if (this.userDetails[name] != value) {
            updateData[name] = value;
          }
        }
      }

      let docRef = getUserDetailsDocRef(this.userId, this.isCustomer);
      updateFromDocRef(docRef, updateData)
        .then(() => {
          console.log("User details successfully updated");
          this.$router.go();
        })
        .catch((error) => {
          console.error("Error updating user details: ", error);
        });
      return;
    },
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

#form {
  margin-left: 20px;
}
</style>
