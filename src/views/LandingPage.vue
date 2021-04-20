<template>
  <div>
    <div class="home">
      <section class="start">
        <img
          src="@/assets/img/FreshBytesLogo.png"
          width="300px"
          height="300px"
          class="img"
        />
      </section>
      <section class="section is-small">
        <login-component v-if="loginMode" @signup="toggleLogin" />
        <signup-component v-if="!loginMode" @back="toggleLogin" />
        <div>Scroll down to learn more about us!</div>
      </section>
      <mission-component></mission-component>
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/login/LoginComponent";
import SignupComponent from "@/components/signup/SignupComponent";
import MissionComponent from "@/components/about/MissionComponent";

export default {
  components: {
    LoginComponent,
    SignupComponent,
    MissionComponent,
  },
  data: function () {
    return {
      loginMode: true,
    };
  },
  methods: {
    toggleLogin: function () {
      this.loginMode = !this.loginMode;
    },
  },
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
}

.start {
  padding-top: 10%;
}

.about-intro {
  position: absolute;
  width: 200px;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 40px;
}
</style>
