<template>
  <div class="listings">
    <h1 class="title is-3">Your Listings</h1>
    <h1 class="subtitle is-6">View, edit or remove your listings here!</h1>
    <b-button type="is-primary" @click="addListingActive = true" class="button">
      Add New Listing
    </b-button>
    <b-tooltip
      label="Click on a listing first"
      type="is-info is-light"
      :active="!hasSelected"
    >
      <b-button
        type="is-info"
        :disabled="!hasSelected"
        @click="editListingActive = true"
        class="button"
      >
        Edit Listings
      </b-button>
    </b-tooltip>
    <b-button
      type="is-danger"
      v-if="hasChecked"
      @click="confirmDelete"
      class="button"
    >
      Delete Selected Listings
    </b-button>
    <b-modal v-model="editListingActive" scroll="keep">
      <edit-listing-component
        v-bind:originalData="this.selected"
        @close="
          () => {
            editListingActive = false;
          }
        "
      />
    </b-modal>
    <b-modal v-model="addListingActive" scroll="keep">
      <add-listing-component
        @close="
          () => {
            addListingActive = false;
            resetItems();
          }
        "
      />
    </b-modal>
    <b-table
      :data="getItems"
      :columns="columns"
      checkable
      :checked-rows.sync="checkedRows"
      checkbox-position="right"
      @check="clearSelect"
      @checkAll="clearSelect"
      :selected.sync="selected"
      @select="resetItems"
      @click="toggleSelect"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddListingComponent from "@/components/listings/AddListingComponent";
import EditListingComponent from "@/components/listings/EditListingComponent";
import { deleteItem } from "@/firebase/database";

export default {
  components: {
    AddListingComponent,
    EditListingComponent,
  },
  data: function () {
    return {
      addListingActive: false,
      editListingActive: false,
      columns: [
        { field: "type", label: "Type" },
        { field: "name", label: "Name" },
        { field: "description", label: "Description" },
        { field: "bestBefore", label: "Best Before" },
        { field: "originalPrice", label: "Original Price" },
        { field: "price", label: "Price" },
        { field: "weight", label: "Weight" },
        { field: "quantity", label: "Quantity" },
        { field: "dietary", label: "Dietary Restriction" },
      ],
      checkedRows: [],
      selected: {},
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
    getItems: function () {
      return this.$store.getters.getItems
        .filter((x) => x.business === this.getUser.username)
        .map((x) => {
          return {
            ...x,
            id: x.id,
            bestBefore: new Date(x.bestBefore.toDate()).toDateString(),
          };
        });
    },
    hasChecked: function () {
      return this.checkedRows.length > 0;
    },
    hasSelected: function () {
      for (var i in this.selected) {
        return true;
      }
      return false;
    },
    selectedList: function () {
      return this.checkedRows.map((x) => x.name).reduce((a, b) => a + ", " + b);
    },
  },
  methods: {
    resetItems: function () {
      this.checkedRows = [];
    },
    confirmDelete: function () {
      this.$buefy.dialog.confirm({
        title: "Delete Selected",
        message:
          "You are about to delete " +
          this.selectedList +
          ".<br>This action is irreversible!",
        confirmText: "Delete",
        type: "is-danger",
        hasIcon: true,
        onConfirm: this.deleteSelected,
      });
    },
    deleteSelected: function () {
      this.checkedRows
        .map((x) => x.id)
        .forEach((x) =>
          deleteItem(x).then(() => {
            console.log("delete item " + x);
            this.resetItems();
          })
        );
    },
    toggleSelect: function (row) {
      console.log(this.selected);
      if (row == this.selected) {
        this.selected = {};
      }
    },
    clearSelect: function () {
      this.selected = {};
    },
  },
};
</script>

<style scoped>
.listings {
  width: 80%;
  margin: auto;
}

.button {
  margin: 20px 5px;
}
</style>
