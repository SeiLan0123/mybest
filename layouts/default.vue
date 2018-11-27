<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app><v-toolbar-title>my best</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs
        v-if="bottomNav=='ranking'"
        slot="extension"
        v-model="currentItem"
        color="transparent"
        fixed-tabs
        slider-color="yellow"
      >
        <v-tab
          v-for="item in items"
          :href="'#' + item"
          :key="item"
        >
          {{ item }}
        </v-tab>

        <v-menu
          v-if="more.length"
          bottom
          class="v-tabs__div"
          left
        >
          <a slot="activator" class="v-tabs__item">
            more
            <v-icon>arrow_drop_down</v-icon>
          </a>

          <v-list class="grey lighten-3">
            <v-list-tile
              v-for="item in more"
              :key="item"
              @click="addItem(item)"
            >
              {{ item }}
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-tabs>
      <v-spacer></v-spacer>
      <p v-if="this.$store.state && this.$store.state.user">{{this.$store.state.user.displayName}}</p>



    </v-toolbar>

    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      app
      >
      <v-btn
        color="teal"
        flat
        value="ranking"
        nuxt
        to="/"
        >
        <span>Ranking</span>
        <v-icon>format_list_numbered</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
        >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="add"
        nuxt
        to="newdata"
        >
        <span>New</span>
        <v-icon>add_circle_outline</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      bottomNav: "ranking",
      currentItem: "ラーメン",
      items: ["ラーメン", "カレー", "パスタ", "Images"],
      more: ["News", "Maps", "Books", "Flights", "Apps"]
    };
  },
  methods: {
    ...mapActions(["setCurrentItem"]),
    addItem(item) {
      const removed = this.items.splice(0, 1);
      this.items.push(...this.more.splice(this.more.indexOf(item), 1));
      this.more.push(...removed);
      this.$nextTick(() => {
        this.currentItem = item;
      });
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
