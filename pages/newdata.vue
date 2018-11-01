<template>
  <section>
    <h1>新しいデータを追加しよう</h1>
    <nuxt-link to="/">ランキングに戻る</nuxt-link>
    <p>品目<input type="text" v-model="item"></p>
    <p>点数<input type="number" v-model="num"></p>
    <p>店名<input type="text" v-model="plc"></p>
    <button @click="add(item, num, plc)">追加</button>
    </section>
</template>


<script>
import firebase from "@/plugins/firebase";
var rankCount = 1;
var database = firebase.database();
var obj;

export default {
  data() {
    return { item: null, num: null, plc: null, obj };
  },
  created: function() {
    firebase
      .database()
      .ref("mybest/ranking/" + this.$store.state.user.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          obj = result.val();
        }
        rankCount = Object.keys(obj).length + 1;
      });
  },
  methods: {
    add() {
      database
        .ref("mybest/ranking/" + this.$store.state.user.uid + "/" + rankCount)
        .set({
          id: String(rankCount),
          item: this.item || " ",
          scr: this.num || 0,
          plc: this.plc || " "
        });
      alert("登録完了");
      rankCount++;
      this.item = "";
      this.num = "";
      this.plc = "";
    }
  }
};
</script>
