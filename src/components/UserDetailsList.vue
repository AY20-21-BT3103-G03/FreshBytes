<template>
  <div id="table">
    <b-table
      :data="tableData[0]"
      :columns="tableData[1]"
      focusable="true"
    ></b-table>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: Object,
    isCustomer: Boolean,
  },
  computed: {
    tableData: function () {
      let userData = [];
      let columns = [];

      userData.push({ detail: "Name", value: this.userDetails.name });
      userData.push({ detail: "Email", value: this.userDetails.email });
      userData.push({ detail: "Username", value: this.userDetails.username });

      if (this.isCustomer) {
        userData.push({ detail: "Points", value: this.userDetails.points });
        userData.push({ detail: "Location", value: this.userDetails.location });
      } else {
        userData.push({ detail: "Address", value: this.userDetails.address });
        userData.push({
          detail: "Description",
          value: this.userDetails.description,
        });
      }
      columns.push({ field: "detail" });
      columns.push({ field: "value" });

      return [userData, columns];
    },
  },
};
</script>

<style scoped>
#table {
  font-weight: bold;
  margin-left: 20px;
}
</style>
