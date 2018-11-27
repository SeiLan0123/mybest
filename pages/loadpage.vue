<template>
  <div>
  </div>
</template>

<script>
import firebase from "@/plugins/firebase";
import { mapActions } from "vuex";

export default {
  layout: "empty",
  async mounted() {
    console.log("login check start");
    //await new Promise(resolve => setTimeout(resolve, 5000000));
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => resolve(user));
    });
    this.setUser(user);
    if (user) {
      this.$router.push("/");
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapActions(["setUser"])
  }
};
</script>
