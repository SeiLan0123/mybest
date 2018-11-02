<template>
  <section>
    <h1>新しいデータを追加しよう</h1>
    <nuxt-link to="/">ランキングに戻る</nuxt-link>
    <p>品目<input type="text" v-model="item"></p>
    <p>店名<input type="text" v-model="plc"></p>
    <button @click="add(item, plc)">追加</button>
    </section>
</template>


<script>
import firebase from "@/plugins/firebase";
var addCount = 0;
var database = firebase.database();
var obj;

export default {
  data() {
    return { item: null, plc: null, obj };
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
        addCount = Object.keys(obj).length + 1;
      });
  },
  methods: {
    add() {
      database
        .ref(
          "mybest/ranking/" +
            this.$store.state.user.uid +
            "/" +
            String(addCount)
        )
        .set({
          //id: String(rankCount),
          item: this.item || " ",
          rank: String(0),
          plc: this.plc || " ",
          id: String(addCount)
        });
      alert("登録完了");
      console.log(addCount);
      addCount--;
      this.item = "";
      this.plc = "";
    }
  }
};
</script>
