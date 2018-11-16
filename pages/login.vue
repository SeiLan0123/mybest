<template>
  <section class="container">
    <div>
      <h1 class="title">
        mybest
      </h1>
      <div class="links">
        <input type="button" class="button--green" value="Login" @click="doLogin">
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "@/plugins/firebase";
import { mapActions } from "vuex";
export default {
  async mounted() {
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user));
    });
    this.setUser(user);
    if (user) {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["login", "setUser"]),
    doLogin() {
      this.login()
        .then(() => console.log("resolved"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 15vw;
  color: #ffeeee;
  letter-spacing: 1px;
}
body {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#05fbff, #56b949);
}

.links {
  padding-top: 15px;
}
</style>
