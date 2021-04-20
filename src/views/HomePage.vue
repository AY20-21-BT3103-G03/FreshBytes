<template>
  <div class="home">
    <img src="@/assets/img/FreshBytesLogo.png" width="300px" height="300px" />
    <h1 class="title is-3">Welcome to Fresh Bytes!</h1>

    <b-carousel class="carousel">
      <b-carousel-item v-for="(slide, i) in slides" :key="i">
        <figure class="image">
          <img :src="slide" />
        </figure>
      </b-carousel-item>
    </b-carousel>

    <section class="section is-small">
      <div data-aos="fade-left">
        <h1 class="title is-3">About Fresh Bytes</h1>
        <h1>
          Fresh Bytes aims to tackle the issue of food wastage due to cosmetic
          filtering. It aims to provide a centralised platform to connect F&B
          businesses, corporations, and individuals and create a means of
          re-distribution for products and produce that are close to expiry or
          have been deemed cosmetically unsellable. Ultimately, this would
          redistribute fresh and inedible products that would have typically
          thrown away to customers at a discounted price.
        </h1>
      </div>
    </section>

    <section class="section is-small">
      <h1 class="title is-3" data-aos="fade-in">Our Motivation</h1>
      <div data-aos="fade-right">
        <h1 class="title is-5"><i>Did you know?</i></h1>
        <h1>
          Over the past 10 years, Singapore has generated an average of 750
          thousand tonnes of food waste annually (National Environment Agency,
          2021). Unfortunately, recycling efforts have not kept up with this
          growing statistic – as of 2019, only a mere 18% of food waste was
          recycled (National Environment Agency, 2021), with the remainder being
          incinerated.
        </h1>
        <br />
        <br />
      </div>
      <div data-aos="fade-left">
        <h1 class="title is-5"><i>What is Ugly Food?</i></h1>
        <h1>
          A large contributor to food waste in Singapore is Cosmetic Filtering,
          whereby "Ugly Food" that is perceived to be damaged or ‘ugly’ by
          personal standards are discarded despite still being fresh and edible.
          The practice of Cosmetic Filtering occurs most often in local farms,
          wet and wholesale markets and supermarkets. At Sheng Siong, a local
          supermarket in Singapore, it is estimated that 10 to 15% of total
          fresh produce stocks are thrown away due to cosmetic blemishes.
        </h1>
        <br />
        <br />
      </div>
      <div data-asos="fade-right">
        <h1 class="title is-5"><i>What can we do?</i></h1>
        <h1>
          We can play an active role to reduce food wastage due to comestic
          filtering of "Ugly Food" by purchasing from wholesalers like Fresh
          Bytes who collaborate with businesses to create a market to resell
          such products and produce! Most importantly, you can help to spread
          awareness about this cause to your family and friends.
        </h1>
      </div>
    </section>

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
    <go-top
      fg-color="#808080"
      bg-color="#ffffff00"
      box-shadow="0px 0px 0px rgba(0, 0, 0, 0)"
    />
  </div>
</template>

<script>
import slide1 from "@/assets/img/slide1.png";
import slide2 from "@/assets/img/slide2.png";
import GoTop from "@inotom/vue-go-top";

export default {
  data: function () {
    return {
      slides: [slide1, slide2],
    };
  },
  components: {
    GoTop,
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
