<template>
  <section>
    <div class="addform">
    <v-flex xs12 sm6 d-flex>
      <v-select
      v-model="category"
      :items="categoryArray"
      label="カテゴリ"
      box
      ></v-select>
    </v-flex>
    <v-text-field
    v-model="item"
    label="品目"
    required
    ></v-text-field>
    <v-text-field
    v-model="plc"
    label="店名"
    required
    ></v-text-field>
    <input type="file" class="file" @change="picUpload">
    <p><img v-show="uploadFile" style="width: 50vw" :src="uploadFile" class="itemImage"></p>
 <v-btn @click="add()">追加</v-btn>
    </div>
    </section>
</template>


<script>
import firebase from "@/plugins/firebase";
import { EXIF } from "exif-js";

var addCount = 0;
var database = firebase.database();
var obj;

export default {
  data() {
    return {
      item: null,
      plc: null,
      obj: [],
      uploadFile: "",
      uploadFileData: "",
      imgPath: "",
      category: "ラーメン",
      categoryArray: [
        "ラーメン",
        "カレー",
        "パスタ",
        "丼",
        "ドリンク",
        "うどん・そば",
        "スイーツ"
      ]
    };
  },
  created: function() {},
  methods: {
    categoryChanged() {
      firebase
        .database()
        .ref(
          "mybest/ranking/" + this.$store.state.userName + "/" + this.category
        )
        .once("value")
        .then(result => {
          if (result.val()) {
            obj = result.val();
            addCount = Object.keys(obj).length + 1;
          }
        });
    },
    //データベースに追加
    add() {
      var metadata = {
        contentType: this.uploadFileData.type
      };
      console.log(this.uploadFileData);
      var storageRef = firebase.storage().ref();
      if (this.uploadFileData) {
        var uploadTask = storageRef
          .child(
            "mybest/" +
              this.$store.state.userName +
              "/" +
              this.uploadFileData.name
          )
          .put(this.uploadFileData, metadata);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          function(snapshot) {
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log("Upload is running");
                break;
            }
          },
          function(error) {
            switch (error.code) {
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
                  "Unknown error occurred, inspect error.serverResponse"
                );
                break;
            }
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
              });
          }
        );
      }
      database
        .ref(
          "mybest/ranking/" +
            this.$store.state.userName +
            "/" +
            this.category +
            "/" +
            String(addCount)
        )
        .set({
          //id: String(rankCount),
          item: this.item || " ",
          rank: String(0),
          plc: this.plc || " ",
          id: String(addCount),
          imgPath: this.imgPath || ""
        });
      alert("登録完了");
      console.log(addCount);
      addCount++;
      this.item = "";
      this.plc = "";
    },
    picUpload(e) {
      e.preventDefault();
      let files = e.target.files;
      this.uploadFile = files[0];
      console.log(this.uploadFile);
      this.uploadFileData = this.uploadFile;
      let reader = new FileReader();
      reader.onload = e => {
        this.uploadFile = e.target.result;
      };
      this.imgPath =
        "mybest/" + this.$store.state.userName + "/" + this.uploadFileData.name;

      reader.readAsDataURL(this.uploadFile);

      EXIF.getData(this.uploadFileData, () => {
        var orientation = this.uploadFileData.exifdata;
        console.log(orientation);
      });
    }
  }
};
</script>

<style>
.addform {
  margin-top: 70px;
}
</style>
