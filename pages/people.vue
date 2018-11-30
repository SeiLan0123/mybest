<template>
<section>
  <div>
    <v-flex xs4>
    <v-text-field
        hide-details
        single-line
        v-model="searchID"
      ></v-text-field>
      <v-btn @click="peopleSearch()"><v-icon>search</v-icon>search</v-btn>
    </v-flex>
  </div>
</section>
</template>

<script>
export default {
  data() {
    return { searchID: null };
  },
  methods: {
    peopleSearch() {
      console.log(this.searchID);
    }
  }
};
</script>
