<template>
  <section>
    <input type="file" class="file" @change="picUpload">
    <img v-show="uploadFile" :src="uploadFile" class="itemImage">
    <img v-show="imgPath" :src="imgPath" class="itemImage">
  </section>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      uploadFile: "",
      imgPath: null
    };
  },
  mounted() {
    console.log("mounted");
    var imgPathObj = firebase
      .storage()
      .ref()
      .child(
        "mybest/" +
          this.$store.state.user.uid +
          "/スクリーンショット 2018-09-26 15.05.35.png"
      );
    imgPathObj
      .getDownloadURL()
      .then(url => {
        this.imgPath = url;
        console.log("then:" + this.imgPath);
      })
      .catch(function(error) {
        console.log(error);
        switch (error.code) {
          case "storage/object-not-found":
            console.log("File doesn't exist");
            break;

          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;

          case "storage/canceled":
            console.log("User canceled the upload");
            break;

          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
        }
      });
    console.log(this.imgPath);
  },
  methods: {
    picUpload(e) {
      e.preventDefault();
      let files = e.target.files;
      this.uploadFile = files[0];
      console.log(this.uploadFile);
      let reader = new FileReader();
      reader.onload = e => {
        this.uploadFile = e.target.result;
      };

      reader.readAsDataURL(this.uploadFile);

      var metadata = {
        contentType: this.uploadFile.type
      };

      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef
        .child(
          "mybest/" + this.$store.state.user.uid + "/" + this.uploadFile.name
        )
        .put(this.uploadFile, metadata);
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
              console.log("User doesn't have permission to access the object");
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
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  },
  watch: {
    uploadFile: function() {
      console.log("This file is" + this.uploadFile);
    }
  }
};
</script>

<style>
.itemImage {
  width: 50vw;
}
</style>
