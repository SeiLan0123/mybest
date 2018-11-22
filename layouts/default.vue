<template>
  <v-app>
    <v-toolbar color="indigo" dark fixed app><v-toolbar-title>my best</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn nuxt to="testpage">テストページ</v-btn>
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
export default {
  data() {
    return { bottomNav: "ranking" };
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
