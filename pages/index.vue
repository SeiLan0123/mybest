<template>
  <section>
  <h1>This is ranking page</h1>
  <nuxt-link to="newdata">データを追加する</nuxt-link>
 {{this.$store.state.user.displayName}}
  </section>
</template>

<script>
import firebase from "@/plugins/firebase";
var obj;
export default {
  data(context) {
    return { obj };
  },
  created: function() {
    firebase
      .database()
      .ref("mybest/ranking/1")
      .once("value")
      .then(result => {
        if (result.val()) {
          obj = result.val();
        }
        console.log(obj);
      });
  }
};
</script>
