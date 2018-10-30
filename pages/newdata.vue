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
var item;
var num;
var plc;

export default {
  data() {
    return { item, num, plc };
  },
  methods: {
    add() {
      var database = firebase.database();
      firebase
        .database()
        .ref("mybest/ranking/1")
        .set({
          item: this.item || " ",
          scr: this.num || 0,
          plc: this.plc || " "
        });
      console.log("add");
    }
  }
};
</script>
