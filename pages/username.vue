<template>
  <section>
    <h1>
      ユーザーネームを決めてください
    </h1>
    <v-text-field
    v-model="userName"
    label="ユーザーネーム"
    required
    ></v-text-field>
    <v-btn value="aa" @click="register()">登録</v-btn>
  </section>
</template>

<script>
import firebase from "firebase";
import "vuetify/dist/vuetify.min.css";
export default {
  data() {
    return { userName: null };
  },

  methods: {
    register() {
      console.log("register");
      firebase
        .database()
        .ref("mybest/user/" + this.$store.state.user.uid)
        .set({
          username: this.userName
        });
    }
  },
  created() {
    if (!this.$store.state.user) {
      this.$router.push("login");
    }
  },

  layout: "empty"
};
</script>
