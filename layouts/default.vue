<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>my best</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs
        v-if="bottomNav=='ranking'||bottomNav=='people'"
        slot="extension"
        v-model="currentItem"
        color="transparent"
        fixed-tabs
        slider-color="yellow"
      >
        <v-tab v-for="item in items" :href="'#' + item" :key="item">{{ item }}</v-tab>

        <v-menu v-if="more.length" bottom class="v-tabs__div" left>
          <a slot="activator" class="v-tabs__item">more
            <v-icon>arrow_drop_down</v-icon>
          </a>

          <v-list class="grey lighten-3">
            <v-list-tile v-for="item in more" :key="item" @click="addItem(item)">{{ item }}</v-list-tile>
          </v-list>
        </v-menu>
      </v-tabs>
      <v-spacer></v-spacer>
      <p v-if="this.$store.state && this.$store.state.userName">
        {{this.$store.state.userName}}
        <v-btn @click="logoutBtn()">ログアウト</v-btn>
      </p>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <v-bottom-nav :active.sync="bottomNav" :value="true" fixed app>
      <v-btn color="teal" flat value="ranking" nuxt to="/">
        <span>Ranking</span>
        <v-icon>format_list_numbered</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="people" nuxt to="people">
        <span>People</span>
        <v-icon>people</v-icon>
      </v-btn>

      <v-btn color="teal" flat value="add" nuxt to="newdata">
        <span>New</span>
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import firebase from "@/plugins/firebase";
import { mapActions } from "vuex";

var database = firebase.database();
export default {
  data() {
    return {
      bottomNav: "ranking",
      currentItem: "ラーメン",
      items: ["ラーメン", "カレー", "パスタ", "丼"],
      more: ["ドリンク", "うどん・そば", "スイーツ"]
    };
  },
  methods: {
    ...mapActions(["setCurrentItem", "logout", "setUserName"]),
    addItem(item) {
      const removed = this.items.splice(0, 1);
      this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      this.more.push(...removed);
      this.$nextTick(() => {
        this.currentItem = item;
      });
    },
    logoutBtn() {
      this.logout();
      this.$router.push("/login");
    }
  },
  watch: {
    currentItem(newValue) {
      console.log("new current Item is " + newValue);
      var payload = {
        currentItem: newValue
      };
      this.setCurrentItem(payload);
    }
  },
  created() {
    if (!this.$store.state.user && this.$route.name != "loadpage") {
      this.$router.push("/login");
    } else if (!this.$store.state.userName) {
      console.log("hello ");

      database
        .ref("mybest/user/" + this.$store.state.user.uid)
        .once("value")
        .then(result => {
          if (result.val()) {
            console.log("firebase connection is success");

            if (result.val().username) {
              console.log(result.val().username);
              this.setUserName(result.val());
            } else {
              console.log("Unknown username");
              this.$router.push("/username");
            }
          } else {
            this.$router.push("/username");
          }
        })
        .catch(err => {
          console.log("uid error");
          console.log(err);
        });
    }
  }
};
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

.button--green {
  display: inline-block;
  border-radius: 20px;
  border: 2px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 30px 90px;
  font-size: 10vw;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
