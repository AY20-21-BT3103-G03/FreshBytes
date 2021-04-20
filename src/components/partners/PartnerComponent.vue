<template>
  <div>
    <section class="section is-small">
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt="Image"
              />
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ partner.name }}</strong>
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
export default {
  props: {
    partner: Object,
  },
};
</script>

<style lang="scss" scoped></style>
