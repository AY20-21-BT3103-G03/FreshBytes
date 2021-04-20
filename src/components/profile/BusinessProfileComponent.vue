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
            <div class="image-parent" v-if="!editMode">
              <a @click.prevent="toggleEditMode"
                ><b-icon icon="pencil-alt" class="icon"></b-icon
              ></a>
              <figure class="image is-128x128 center">
                <img class="is-circular" :src="image" alt="Profile image" />
              </figure>
            </div>
            <div v-if="editMode">
              <file-pond
                ref="pond"
                class="pond"
                label-idle="Drag Photo here or <u>Browse</u>"
                accepted-file-types="image/jpeg, image/png"
                required
              />
              <p class="has-text-danger">{{ imageError }}</p>
              <b-button class="is-small" type="is-primary" @click="editImage"
                >Upload</b-button
              >
              <b-button
                class="is-small"
                type="is-info"
                @click="editMode = false"
                >Back</b-button
              >
            </div>
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
                <b-button>Edit Profile</b-button>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section is-medium">
      <div class="columns is-mobile">
        <div>
          <business-listings-component></business-listings-component>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BusinessListingsComponent from "@/components/listings/BusinessListingsComponent.vue";
import UserIcon from "@/assets/img/usericon.png";
import FilePond from "@/filepond";
import { uploadImage } from "@/firebase/storage";
import { updateUser } from "@/firebase/auth";

export default {
  components: {
    BusinessListingsComponent,
    FilePond,
  },
  computed: {
    ...mapGetters(["getUser"]),
    image: function () {
      return this.getUser.image || UserIcon;
    },
  },
  data() {
    return {
      editMode: false,
      imageError: "",
    };
  },
  methods: {
    toggleEditMode: function () {
      this.editMode = true;
      this.imageError = "";
    },
    editImage: async function () {
      const files = this.$refs.pond.getFiles();

      if (files.length == 0) {
        this.imageError = "Please upload an image!";
        return;
      }

      const image = files[0].file;
      console.log(image);

      const fileLocation = await uploadImage(image, image.name);

      console.log(fileLocation);

      const updatedData = await updateUser(this.getUser.id, {
        image: fileLocation,
      });

      this.$store.commit("updateUser", updatedData);

      this.editMode = false;
    },
  },
};
</script>

<style scoped>
button {
  margin: 0 2px;
}

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

.image-parent {
  position: relative;
  height: 140px;
  width: 200px;
  margin: 0 auto;
}

.icon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
