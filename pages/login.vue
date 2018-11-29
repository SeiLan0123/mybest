<template>
  <section class="container">
    <div>
      <div class="links">
        <input type="button" class="button--green" value="Login" @click="doLogin()">
      </div>
    </div>
  </section>
</template>

<script>
import firebase from "@/plugins/firebase";
import { mapActions } from "vuex";

var database = firebase.database();

export default {
  layout: "empty",
  // beforeCreate() {
  //   console.log("beforeCreate");

  //   this.$nuxt.$loading.start();
  // },
  methods: {
    ...mapActions(["login", "setUser", "setUserName"]),
    doLogin() {
      this.login()
        .then(() => {
          console.log("resolved");
        })
        .catch(err => console.log(err));
    }
  },
  async mounted() {
    console.log("login check start");
    //await new Promise(resolve => setTimeout(resolve, 5000000));
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user));
    });
    this.setUser(user);

    if (user) {
      console.log("hello user");

      database
        .ref("mybest/user/" + user.uid)
        .once("value")
        .then(result => {
          console.log("sry i find it");
          if (result.val()) {
            console.log("firebase connection is success");

            if (result.val().username) {
              console.log("uid is alive");
              this.setUserName(result.val().username);
              this.$router.push("/");
            } else {
              console.log("Unknown username");
              this.$router.push("username");
            }
          } else {
            this.$router.push("username");
          }
        })
        .catch(err => {
          console.log("uid error");
          console.log(err);
        });
      //this.$router.push("/");
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
  /* background: linear-gradient(#05fbff, #56b949); */
}

.links {
  padding-top: 15px;
}
</style>
