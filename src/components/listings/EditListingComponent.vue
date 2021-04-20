<template>
  <div class="card">
    <div class="card-content">
      <h1 class="title is-3">Edit Listing</h1>
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
            label="Name"
            label-position="inside"
          >
            <b-input v-model="name" placeholder="Name" />
          </b-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors, valid }">
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            label="Description"
            label-position="inside"
          >
            <b-input
              type="textarea"
              v-model="description"
              placeholder="Description"
            />
          </b-field>
        </validation-provider>
        <validation-provider rules="required" v-slot="{ errors, valid }">
          <b-field
            :message="errors"
            :type="{ 'is-danger': errors[0], 'is-success': valid }"
            label="Best Before"
            label-position="inside"
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
            label="Original Price ($)"
            label-position="inside"
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
            label="Current Price ($)"
            label-position="inside"
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
            label="Weight (kg/l)"
            label-position="inside"
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
            label="Quantity"
            label-position="inside"
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
        <validation-provider rules="required" v-slot="{ errors }">
          <label style="margin-bottom: 2px" class="label"
            >Collection Options</label
          >
          <div class="block">
            <b-checkbox v-model="collection" native-value="Delivery"
              >Delivery</b-checkbox
            >
            <b-checkbox v-model="collection" native-value="Self Pickup"
              >Self Pickup</b-checkbox
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
            @init="handleFilePondInit"
            @updatefiles="hasNewImage = true"
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
          Edit Listing
        </b-button>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mapGetters } from "vuex";
import { updateItem } from "@/firebase/database";
import { uploadImage, deleteImage } from "@/firebase/storage";
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
      hasNewImage: false,
    };
  },
  props: {
    originalData: {},
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  mounted: function () {
    this.type = this.originalData.type;
    this.name = this.originalData.name;
    this.description = this.originalData.description;
    this.bestBefore = new Date(this.originalData.bestBefore);
    this.originalPrice = this.originalData.originalPrice;
    this.price = this.originalData.price;
    this.weight = this.originalData.weight;
    this.quantity = this.originalData.quantity;
    this.dietary = this.originalData.dietary;
    this.collection = this.originalData.collection;
  },
  methods: {
    submit: async function () {
      const loadingComponent = this.$buefy.loading.open();
      const files = this.$refs.pond.getFiles();
      const { hasNewImage, ...filterData } = this._data;
      console.log(hasNewImage);
      let itemData = {
        ...filterData,
        business: this.getUser.username,
        points: Math.floor(this.weight * 10),
      };

      if (files.length != 0) {
        const image = files[0].file;

        if (this.hasNewImage) {
          const fileLocation = await uploadImage(image, image.name);
          itemData.image = fileLocation;

          let imgName = this.originalData.image
            .split("/")[7]
            .split("?")[0]
            .split("images%2F")[1];
          await deleteImage(imgName);
        }
      }

      console.log(itemData);

      updateItem(itemData, this.originalData.id).then(() => {
        loadingComponent.close();
        this.$emit("close");
      });
    },
    handleFilePondInit: function () {
      console.log(this.originalData.image);
      fetch(this.originalData.image, { method: "GET" })
        .then((res) => {
          let url = res.url;
          let imgName = url.split("/")[7].split("_")[1].split("?")[0];
          return [res.blob(), imgName];
        })
        .then((result) => {
          let imgName = result[1];
          result[0].then((blob) => {
            const file = new File([blob], imgName, {
              type: "image/jpeg",
            });
            this.oldImage = file;
            this.$refs.pond.addFile(this.oldImage);
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
