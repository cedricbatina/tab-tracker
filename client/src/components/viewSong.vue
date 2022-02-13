<template>
  <div>
    <div>
      <h1>Get the entire song view</h1>
      <p>The song {{ song.id }} can be seen here</p>
    </div>
    <div></div>
  </div>
</template>
<script>
import songService from "../services/songService";
export default {
  data() {
    return {
      song: null,
    };
  },
  methods: {
    oneSong(id) {
      songService
        .getAsong(id)
        .then((response) => {
          this.song.id = response.data.id;
        })
        .catch();
    },
    mounted() {
      this.song(this.route.params.id);
    },
  },
};
</script>
