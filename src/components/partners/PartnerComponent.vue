<template>
  <div>
    <section class="section is-small">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img :src="image" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ partner.name }}</strong>
                <br />
                <small>@{{ partner.username }}</small>
                <br />
                {{ partner.description }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import UserIcon from "@/assets/img/usericon.png";

export default {
  props: {
    partner: Object,
  },
  computed: {
    image: function () {
      return this.partner.image || UserIcon;
    },
  },
};
</script>

<style lang="scss" scoped></style>
