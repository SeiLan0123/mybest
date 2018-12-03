<template>
<v-app>
  <section>
    <v-alert
    v-model="alert"
    dismissible
    type="error"
    >
    This username already used
    </v-alert>
    <h1>
      ユーザーネームを決めてください
    </h1>
    <v-text-field
    v-model="userName"
    :rules="[rules.username]"
    label="ユーザーネーム"
    required
    ></v-text-field>
    <v-btn v-if="btnFlg" value="aa" @click="register()">登録</v-btn>
  </section>
</v-app>
</template>

<script>
import firebase from "firebase";
import "vuetify/dist/vuetify.min.css";
import { mapActions } from "vuex";
var database = firebase.database();

export default {
  data() {
    return {
      userName: null,
      alert: false,
      btnFlg: false,
      rules: {
        username: value => {
          const pattern = /^[a-zA-Z0-9]+$/;

          this.btnFlg = pattern.test(value || "");
          return pattern.test(value) || "Invalid Username.";
        }
      }
    };
  },

  methods: {
    ...mapActions(["setUserName"]),
    register() {
      database
        .ref("mybest/username/" + this.userName)
        .once("value")
        .then(result => {
          if (!result.val()) {
            console.log(result.val());

            database.ref("mybest/user/" + this.$store.state.user.uid).set({
              username: this.userName
            });
            console.log("success!!");

            database
              .ref("mybest/username/" + this.userName)
              .set(true)
              .then(() => {
                var payloadObj = [];
                console.log("FRDB:setUserName");
                console.log(this.userName);
                payloadObj.username = this.userName;
                this.setUserName(payloadObj);
                this.$router.push("/");
              });
          } else {
            console.log("failed");
            this.alert = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!this.$store.state.user) {
      this.$router.push("login");
    } else if (this.$store.state.userName) {
      this.$router.push("/");
    }
  },
  computed: {},

  layout: "empty"
};
</script>
