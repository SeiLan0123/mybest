<template>
  <div>
    <nuxt/>
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      fixed
      color="transparent"
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
  </div>
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
  margin: 0;
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
