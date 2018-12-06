<template>
  <v-app>
    <v-layout align-center justify-center fill-height>
      <v-progress-circular :size="300" :width="20" color="green" indeterminate></v-progress-circular>
    </v-layout>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
import { mapActions } from "vuex";
import "vuetify/dist/vuetify.min.css";

export default {
  layout: "empty",
  async mounted() {
    console.log("login check start");
    await new Promise(resolve => setTimeout(resolve, 500000));
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

<style>
v-progress-circular {
}
</style>
