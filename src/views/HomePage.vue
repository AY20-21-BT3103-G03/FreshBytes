<template>
  <div class="home">
    <img src="@/assets/img/FreshBytesLogo.png" width="300px" height="300px" />
    <b-carousel class="carousel">
      <b-carousel-item v-for="(slide, i) in slides" :key="i">
        <figure class="image">
          <img :src="slide" />
        </figure>
      </b-carousel-item>
    </b-carousel>
    <section class="section is-small">
      <h1 class="title is-3">Our Team</h1>
      <h1 class="subtitle is-6">Meet the developers behind Fresh Bytes</h1>
      <br />
      <ul>
        <li>
          <img src="@/assets/img/darren.jpeg" height="300px" width="300px" />
          <p><b>Darren</b></p>
        </li>
        <li>
          <img src="@/assets/img/erica.jpeg" height="300px" width="300px" />
          <p><b>Erica</b></p>
        </li>
      </ul>
      <ul>
        <li>
          <img src="@/assets/img/patricia.jpeg" height="300px" width="300px" />
          <p><b>Patricia</b></p>
        </li>
        <li>
          <img src="@/assets/img/glenn.jpeg" height="300px" width="300px" />
          <p><b>Glenn</b></p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import slide1 from "@/assets/img/slide1.png";
import slide2 from "@/assets/img/slide2.png";

export default {
  data: function () {
    return {
      slides: [slide1, slide2],
    };
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}

.carousel {
  width: 1000px;
  margin: auto;
  margin-top: 50px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 500px;
  text-align: center;
  padding: 10px;
  margin: 10px;
}
</style>
