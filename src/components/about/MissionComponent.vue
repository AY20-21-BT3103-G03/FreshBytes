<template>
  <div class="about">
    <h1 class="title" data-aos="fade-in">Our Mission</h1>
    <div class="about-card" data-aos="fade-right">
      <p>
        We connect you to F&B businesses and local supermarket who have fresh
        but excess or comestically imperfect products or produce for sale at discounted
        rates.
      </p>
      <p>
        We believe that every item saved is a step closer towards saving our
        Earth.
      </p>
    </div>
    <div class="about-card" data-aos="fade-left">
      <h1 class="title is-4">Less Waste, Better Taste</h1>
      <p>
        Food waste is one of the biggest waste streams in Singapore and the
        amount of food waste generated has grown by around
        <b>20% over the last 10 years.</b>
      </p>
      <br />
      <p>
        In 2019, Singapore generated around 744 million kg of food waste. That
        is equivalent to 2 bowls of rice per person per day, or around 51,000
        double decker buses.
      </p>
    </div>
    <go-top
      fg-color="#808080"
      bg-color="#ffffff00"
      box-shadow="0px 0px 0px rgba(0, 0, 0, 0)"
    />
  </div>
</template>

<script>
import GoTop from "@inotom/vue-go-top";
export default {
  components: {
    GoTop,
  },
};
</script>

<style scoped>
.about {
  margin-top: 5%;
  padding: 0 20%;
}

.about-card {
  margin: 50px 0;
}
</style>
