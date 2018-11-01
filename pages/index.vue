<template>
  <section>
  <h1>This is ranking page</h1>
  <nuxt-link to="newdata">データを追加する</nuxt-link>
   {{this.$store.state.user.displayName}}

<div v-for="o in obj " :key="o.id" class="rankingList" draggable="true" @dragstart="dragstart(o, $event)" @dragend="dragend" @dragenter="dragenter(o)">{{o.rank}}{{o.item}}{{o.plc}}</div>
  </section>
</template>

<script>
import firebase from "@/plugins/firebase";
export default {
  data(context) {
    return { obj: null };
  },
  created: function() {
    firebase
      .database()
      .ref("mybest/ranking/" + this.$store.state.user.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          this.obj = result
            .val()
            .filter(function(v) {
              return v;
            })
            .sort(function(a, b) {
              return a.scr - b.scr;
            });
          for (var i = 1; i <= Object.keys(result.val()).length; i++) {
            this.obj[i - 1].rank = String(i);
          }
        }
      });
  },
  methods: {
    dragstart(obj, e) {
      this.draggingItem = obj;
      e.target.style.opacity = 0.5;
    },
    dragend(e) {
      e.target.style.opacity = 1;
    },
    dragenter(obj) {
      console.log(this.obj[0].rank);
      const tmpIndex = obj.rank;
      obj.rank = this.draggingItem.rank;
      this.draggingItem.rank = tmpIndex;
    }
    /*swapRanking: function(params) {
      Array.prototype.forEach.call(
        document.querySelectorAll("rankingList"),
        function(rL) {
          rL.addEventListener(
            "dragstart",
            function() {
              console.log("drag");
              this.style.opacity = "0.4";
            },
            false
          );
        }
      );
    }*/
  }
};
</script>

<style>
.rankingList {
  width: 80vh;
  margin: 0 auto;
  font-size: 30pt;
  box-shadow: 0px 0px 7px 0px #45dbfc;
  border: 2px solid #cccccc;
}
</style>
