<template>
  <div>
    <div class="bg-light is-fullheight">
      <section class="hero is-primary profile-cover is-bold">
        <div class="hero-body">
          <div class="container"></div>
        </div>
      </section>
    </div>

    <section class="orders">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child">
            <figure class="image is-128x128 center">
              <img
                class="is-circular"
                src="@/assets/img/usericon.png"
                alt="Profile image"
              />
            </figure>
            <p class="title">{{ getUser.name }}</p>
            <p class="subtitle">@{{ getUser.username }}</p>
          </article>
        </div>
        <div class="tile is-vertical is-8">
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child">
                <br />
                <p class="title is-4">About {{ getUser.name }}</p>
                <p>{{ getUser.description }}</p>
                <br />
              </article>

              <article class="tile is-child">
                <b-navbar shadow="true" class="navbar-item">
                  <template #start>
                    <b-navbar-item href="#" @click="toggleEdit = true">
                      Edit Profile
                    </b-navbar-item>
                    <b-navbar-item href="#">
                      <span @click="toggleLists()"> Your Listings </span>
                    </b-navbar-item>
                    <b-navbar-item href="/dashboard"> Dashboard </b-navbar-item>
                  </template>
                </b-navbar>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section is-small">
      <div class="columns is-mobile">
        <div v-if="toggleListing">
          <business-listings-component></business-listings-component>
        </div>
      </div>
    </section>
    <b-modal v-model="toggleEdit" scroll="keep">
      <edit-user-profile
        @close="
          () => {
            toggleEdit = false;
          }
        "
      />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BusinessListingsComponent from "@/components/listings/BusinessListingsComponent.vue";
import EditUserProfile from "@/components/profile/EditUserProfile.vue";

export default {
  data() {
    return {
      toggleListing: false,
      toggleEdit: false,
    };
  },
  components: {
    BusinessListingsComponent,
    EditUserProfile,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    toggleLists: function () {
      this.toggleListing = !this.toggleListing;
    },
  },
};
</script>

<style scoped>
.card {
  width: 400px;
  margin: auto;
}

.is-circular {
  border-radius: 50%;
}

.center {
  text-align: center;
  margin: 0 auto;
}

.orders {
  margin-top: 40px;
}

.navbar-item {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
