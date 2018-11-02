<template>
  <section>
  <h1>This is ranking page</h1>
  <nuxt-link to="newdata">データを追加する</nuxt-link>
   {{this.$store.state.user.displayName}}
   <button @click="apply">ランキングを更新する</button>

<draggable element="ul" class="rankingListDiv" v-model="obj" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="draggingisEnd">
  <transition-group type="transition" :name="'flip'">

  <li v-for="(a, index) in obj " class="rankingList" :key="a.id">{{index + 1}}位<p>{{a.item}}</p><p>{{a.plc}}</p></li>
  </transition-group>
</draggable>
{{jsonobj}}
  </section>
</template>


<script>
import firebase from "@/plugins/firebase";
import draggable from "vuedraggable";

var dragging;
var database = firebase.database();

export default {
  components: {
    draggable
  },

  data(context) {
    return { obj: [] };
  },
  created: function() {
    database
      .ref("mybest/ranking/" + this.$store.state.user.uid)
      .once("value")
      .then(result => {
        if (result.val()) {
          console.log(result.val());
          this.obj = Object.keys(result.val())
            .map(key => result.val()[key])
            .filter(function(v) {
              return v;
            })
            .sort(function(a, b) {
              return a.rank - b.rank;
            });
        }
      });
  },
  methods: {
    draggingisEnd() {
      this.isDragging = true;
      for (var i = 0; i < Object.keys(this.obj).length; i++) {
        this.obj[i].rank = String(i + 1);
      }
    },
    apply() {
      database
        .ref("mybest/ranking/" + this.$store.state.user.uid)
        .set(this.obj);
      alert("更新完了");
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }

    /* dragstart(obj, e) {
      this.draggingItem = obj;
      e.target.style.opacity = 0.5;
      dragging = true;
    },
    dragend(e) {
      e.target.style.opacity = 1;
      dragging = false;
      console.log(dragging);
    },
    dragenter(objIndex) {
      console.log(dragging);
      const obj = this.obj[objIndex];
      const tmpIndex = obj.scr;
      obj.scr = this.draggingItem.scr;
      this.draggingItem.scr = tmpIndex;
    }
    */
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
  },
  computed: {
    jsonobj() {
      return JSON.stringify(this.obj, null, 4);
    },

    dragOptions() {
      return {
        animation: 0,
        group: "description",
        ghostClass: "ghost",
        dragClass: "sortable-drag"
      };
    }
    /*orderdByRank: function() {
      if (!dragging) {
        return this.obj.concat().sort((a, b) => {
          console.log(a.scr, " <=> ", b.scr, " is ", a.scr - b.scr);
          return a.scr - b.scr;
        });
      }
      return this.obj;
    }*/
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  }
};
</script>

<style>
.rankingList {
  width: 20vw;
  margin: 0 auto;
  font-size: 10pt;
  box-shadow: 0px 0px 7px 0px #45dbfc;
  border: 2px solid #cccccc;
}
ul {
  list-style: none;
}

.ghost {
  opacity: 0;
}

.sortable-drag {
  font-size: 15pt;
}
</style>
