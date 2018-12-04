<template>
  <section>

    <draggable element="ul" class="rankingListDiv" v-model="obj" :options="dragOptions" :move="onMove" @start="isDragging=true" @end="draggingisEnd" @update="draggingUpdate">
    <transition-group type="transition" :name="'flip'">
      <li v-for="(a, index) in obj " class="rankingList" :key="a.id">
        <v-flex xs12>
          <v-card color="indigo" class="white--text">
            <v-layout row>
              <v-flex xs7>
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{index + 1}}位</div>
                    <div>{{a.item}}</div>
                    <div>{{a.plc}}</div>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex xs5>
                <v-img
                  v-show="a.imgPath"
                  :src="getImgurlb(a.imgPath)"
                  height="120px"
                  contain
                  ></v-img>
              </v-flex>
              <v-flex xs4>
                <v-btn small fab @click="dialog = true"><v-icon>clear</v-icon></v-btn>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>

          </v-card>
        </v-flex>
      </li>
    </transition-group>
    </draggable>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">カードを削除しますか?</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            いいえ
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            はい
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </section>
</template>


<script>
import firebase from "@/plugins/firebase";
import draggable from "vuedraggable";
import "vuetify/dist/vuetify.min.css";

var dragging;
var database = firebase.database();
var imgPathObj;

export default {
  fetch({ store, redirect }) {
    console.log(store);
    console.log("fetching data");

    if (!store.state.user) {
      return redirect("/loadpage");
    }
  },

  components: {
    draggable
  },

  data(context) {
    return { obj: [], imgURL: {}, bottomNav: "ranking", dialog: false };
  },
  created: function() {
    this.displayList();
  },
  methods: {
    displayList() {
      console.log("displayList");
      database
        .ref(
          "mybest/ranking/" +
            this.$store.state.userName +
            "/" +
            this.$store.state.currentItem
        )
        .once("value")
        .then(result => {
          console.log(result);
          if (result.val()) {
            this.obj = Object.keys(result.val())
              .map(key => result.val()[key])
              .filter(function(v) {
                return v;
              })
              .sort(function(a, b) {
                return a.rank - b.rank;
              });
            this.obj.forEach(s => {
              if (s.imgPath) {
                console.log("img path is alive");
                imgPathObj = firebase
                  .storage()
                  .ref()
                  .child(s.imgPath);
                imgPathObj
                  .getDownloadURL()
                  .then(url => {
                    var path = s.imgPath;
                    this.$set(this.imgURL, path, url);
                    //              this.imgURL[path] = url;
                  })
                  .catch(function(error) {
                    console.log(error);
                    switch (error.code) {
                      case "storage/object-not-found":
                        console.log("File doesn't exist");
                        break;

                      case "storage/unauthorized":
                        console.log(
                          "User doesn't have permission to access the object"
                        );
                        break;

                      case "storage/canceled":
                        console.log("User canceled the upload");
                        break;

                      case "storage/unknown":
                        console.log(
                          "Unknown error occurred, inspect the server response"
                        );
                        break;
                    }
                  });
              }
            });
          } else {
            this.obj = null;
          }
        });
    },
    getImgurlb(imgPath) {
      return this.imgURL[imgPath];
    },
    draggingisEnd() {
      this.isDragging = true;
      for (var i = 0; i < Object.keys(this.obj).length; i++) {
        this.obj[i].rank = String(i + 1);
      }
    },
    draggingUpdate() {
      database
        .ref(
          "mybest/ranking/" +
            this.$store.state.userName +
            "/" +
            this.$store.state.currentItem
        )
        .set(this.obj);
      console.log("更新完了");
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
    getTabName() {
      console.log("getTabName");
      return this.$store.state.currentItem;
    },
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
    getTabName(currentItem) {
      console.log("changed currentItem");
      this.displayList();
    },

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
  width: 220px;
  left: auto;
  font-size: 10pt;
  background-color: #fff;
}

ul.rankingListDiv {
  overflow: scroll;
  list-style: none;
}

.ghost {
  opacity: 0;
}
/*
.sortable-drag {
  font-size: 15pt;
}
*/
img.itemImg {
  margin: auto;
  width: 5vw;
  height: 5vw;
}
</style>
