<template>
  <section>
    <div>
      <v-flex xs12>
        <v-text-field hide-details single-line v-model="searchID"></v-text-field>
        <v-btn @click="peopleSearch()">
          <v-icon>search</v-icon>search
        </v-btn>
      </v-flex>
    </div>
    <ul class="rankingListDiv">
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
                <v-img v-show="a.imgPath" :src="getImgurlb(a.imgPath)" height="100px" contain></v-img>
              </v-flex>
            </v-layout>
            <v-divider light></v-divider>
          </v-card>
        </v-flex>
      </li>
    </ul>
  </section>
</template>

<script>
import firebase from "@/plugins/firebase";

var database = firebase.database();
var imgPathObj;
export default {
  data() {
    return { searchID: null, obj: [], imgURL: {} };
  },
  computed: {
    getTabName() {
      console.log("getTabName");
      return this.$store.state.currentItem;
    }
  },
  watch: {
    getTabName(currentItem) {
      if (this.searchID) {
        this.displayList();
      }
    }
  },
  methods: {
    peopleSearch() {
      console.log(this.searchID);
      this.displayList();
    },
    displayList() {
      console.log("displayList");
      database
        .ref(
          "mybest/ranking/" +
            this.searchID +
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
    }
  }
};
</script>
