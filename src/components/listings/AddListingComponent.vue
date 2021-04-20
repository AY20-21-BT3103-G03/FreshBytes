<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title is-3">Add Listing</h1>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <validation-provider rules="required" name="Type" v-slot="{ errors }">
          <div class="block">
            <b-radio v-model="type" native-value="UglyFood">Ugly Food</b-radio>
            <b-radio v-model="type" native-value="Product">Product</b-radio>
            <p class="has-text-danger">{{ errors[0] }}</p>
          </div>
        </validation-provider>
        <validation-provider rules="required|max:40" v-slot="{ errors, valid }">
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-input v-model="name" placeholder="Name" />
          </b-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors, valid }">
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-input
              type="textarea"
              v-model="description"
              placeholder="Description"
            />
          </b-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors, valid }">
          <label style="margin-bottom: 2px" class="label">Best Before</label>
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-datepicker v-model="bestBefore" trap-focus />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|positive|decimal|max_price"
          v-slot="{ errors, valid }"
        >
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-input
              type="number"
              v-model="originalPrice"
              placeholder="Original Price ($)"
            />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|positive|decimal|max_price"
          v-slot="{ errors, valid }"
        >
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-input
              type="number"
              v-model="price"
              placeholder="Current Price ($)"
            />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|positive|max_weight:4"
          v-slot="{ errors, valid }"
        >
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-input
              type="number"
              v-model="weight"
              placeholder="Weight (kg/l)"
            />
          </b-field>
        </validation-provider>
        <validation-provider
          rules="required|greater_than_0|max_qty:6"
          v-slot="{ errors, valid }"
        >
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
          >
            <b-input
              type="number"
              v-model="quantity"
              placeholder="Quantity Available"
            />
          </b-field>
        </validation-provider>
        <validation-provider v-slot="{ errors }">
          <label style="margin-bottom: 2px" class="label"
            >Dietary Restrictions</label
          >
          <div class="block">
            <b-checkbox v-model="dietary" native-value="Lactose Intolerant"
              >Lactose Free</b-checkbox
            >
            <b-checkbox v-model="dietary" native-value="Vegetarian"
              >Vegetarian</b-checkbox
            >
            <b-checkbox v-model="dietary" native-value="Nut Allergies"
              >Nut Free</b-checkbox
            >
            <b-checkbox v-model="dietary" native-value="Halal"
              >Halal</b-checkbox
            >
            <p class="has-text-danger">{{ errors[0] }}</p>
          </div>
        </validation-provider>
        <div>
          <file-pond
            ref="pond"
            class="pond"
            label-idle="Drag Photo here or <u>Browse</u>"
            accepted-file-types="image/jpeg, image/png"
            required
          />
          <small class="has-text-danger">{{ imageError }}</small>
        </div>
        <b-button
          type="is-primary"
          rounded
          expanded
          class="button"
          @click="handleSubmit(submit)"
        >
          Add Listing
        </b-button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapGetters } from "vuex";
import { addItem } from "@/firebase/database";
import { uploadImage } from "@/firebase/storage";
import FilePond from "@/filepond";

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    FilePond,
  },
  data: function () {
    return {
      type: "",
      name: "",
      description: "",
      bestBefore: new Date(),
      originalPrice: "",
      price: "",
      weight: "",
      quantity: "",
      dietary: [],
      collection: [],
      imageError: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    submit: async function () {
      const files = this.$refs.pond.getFiles();

      if (files.length == 0) {
        this.imageError = "Please upload an image!";
        return;
      }

      const image = files[0].file;
      console.log(image);

      const fileLocation = await uploadImage(image, image.name);

      console.log(fileLocation);

      const itemData = {
        ...this._data,
        business: this.getUser.username,
        image: fileLocation,
        points: Math.floor(this.weight * 10),
      };

      addItem(itemData).then(() => {
        this.$emit("close");
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
