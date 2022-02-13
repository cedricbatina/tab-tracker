<template>
  <div>
    <div v-if="oneSong">
      <h4>{{ oneSong.artist }}</h4>
      <h5>oneSong.title</h5>
    </div>
    <div v-else><p>Keep on workin' Shaka, you're doin' good</p></div>
  </div>
</template>
<script>
import songService from "../services/songService";
export default {
  name: "viewSong",
  data() {
    return {
      oneSong: null,
    };
  },
  methods: {
    getOnesong(id) {
      songService
        .getAsong(id)
        .then((response) => {
          this.oneSong = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mounted() {
      this.getOnesong(this.$route.params.id);
    },
  },
};
</script>
