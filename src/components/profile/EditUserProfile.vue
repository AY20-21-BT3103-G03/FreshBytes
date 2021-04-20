<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title is-3">Edit Profile</h1>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <validation-provider
          rules="required|alpha_spaces"
          v-slot="{ errors, valid }"
          name="Name"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="Name"
            label-position="inside"
          >
            <b-input
              v-model="name"
              placeholder="name"
              icon-pack="fas"
              icon="user-circle"
            />
          </b-field>
        </validation-provider>

        <validation-provider
          rules="required|email"
          v-slot="{ errors, valid }"
          name="Email"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="Email"
            label-position="inside"
          >
            <b-input
              type="email"
              v-model="email"
              placeholder="email"
              icon-pack="fas"
              icon="inbox"
            />
          </b-field>
        </validation-provider>

        <validation-provider
          rules="required"
          v-slot="{ errors, valid }"
          name="Description"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="Description"
            label-position="inside"
            v-if="!getUser.isCustomer"
          >
            <b-input
              type="textarea"
              v-model="description"
              placeholder="Tell us about your company!"
              icon-pack="fas"
            />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|available_username"
          v-slot="{ errors, valid }"
          name="username"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="Username"
            label-position="inside"
          >
            <b-input
              v-model="username"
              placeholder="username"
              icon-pack="fas"
              icon="user"
            />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|password_min:8"
          vid="password"
          v-slot="{ errors, valid }"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="New Password"
            label-position="inside"
          >
            <b-input
              type="password"
              v-model="password"
              placeholder="password"
              icon-pack="fas"
              icon="lock"
            />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|confirmed:password"
          v-slot="{ errors, valid }"
        >
          <b-field
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            :message="errors"
            label="Confirm New Password"
            label-position="inside"
          >
            <b-input
              type="password"
              v-model="confirmPassword"
              placeholder="Confirm Password"
              icon-pack="fas"
              icon="lock"
            />
          </b-field>
        </validation-provider>

        <b-button
          type="is-primary"
          rounded
          expanded
          class="button"
          @click="handleSubmit(submit)"
        >
          Edit Profile
        </b-button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { mapGetters } from "vuex";
import { updateUser } from "@/firebase/database";
import { getUsernames } from "@/firebase/auth";
import { login } from "@/firebase/auth";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: function () {
    return {
      name: "",
      email: "",
      description: "",
      username: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  created: function () {
    const userData = this.getUser;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.username = userData.username;
    this.password = userData.password;
    this.confirmPassword = userData.password;
    console.log(userData);
    // Validation for taken usernames
    getUsernames().then((usernames) => {
      extend("available_username", (value) => {
        if (!usernames.includes(value) | (value == userData.username)) {
          return true;
        }
        return "Username already taken!";
      });
    });
  },
  methods: {
    submit: async function () {
      const loadingComponent = this.$buefy.loading.open();

      const newUserData = {
        ...this._data,
      };
      delete newUserData.confirmPassword;

      if (this.getUser.isCustomer) {
        delete newUserData.description;
      }

      updateUser(newUserData, this.getUser.id).then(() => {
        login(this.username, this.password).then((result) => {
          this.$store.commit("login", result);
          loadingComponent.close();
          this.$emit("close");
        });
      });
    },
  },
};
</script>

<style scoped>
.card {
  margin: auto;
}

.label {
  text-align: left;
}
</style>
