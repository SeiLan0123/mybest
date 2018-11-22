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
                  height="100px"
                  contain
                  ></v-img>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
          </v-card>
        </v-flex>
      </li>
    </transition-group>
    </draggable>


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
  components: {
    draggable
  },

  data(context) {
    return { obj: [], imgURL: {}, bottomNav: "recent" };
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
      });
  },
  mounted: function() {
    console.log("obj is " + this.obj);
    console.log("mounted");
  },
  methods: {
    getImgurlb(imgPath) {
      console.log(this.imgURL);
      console.log(this.imgURL[imgPath]);
      return this.imgURL[imgPath];
    },
    getImgurl(imgPath) {
      if (imgPath) {
        var imgPathUrl;
        console.log(imgPath);
        var imgPathObj = firebase
          .storage()
          .ref()
          .child(imgPath);
        imgPathObj
          .getDownloadURL()
          .then(url => {
            console.log(url);
            imgPathUrl = url;
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
        return imgPathUrl;
      }
    },
    draggingisEnd() {
      this.isDragging = true;
      for (var i = 0; i < Object.keys(this.obj).length; i++) {
        this.obj[i].rank = String(i + 1);
      }
    },
    draggingUpdate() {
      database
        .ref("mybest/ranking/" + this.$store.state.user.uid)
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

.sortable-drag {
  font-size: 15pt;
}

img.itemImg {
  margin: auto;
  width: 5vw;
  height: 5vw;
}

</style>
