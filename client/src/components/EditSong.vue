<template>
  <div v-if="oneSong" class="edit-form py-3">
    <p class="headline">Edit Tutorial</p>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="oneSong.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>
      <v-text-field
        v-model="oneSong.artist"
        :rules="[(v) => !!v || 'Artist name is required']"
        label="Artist"
        required
      ></v-text-field>
      <label><strong>Status:</strong></label>
      {{ oneSong.published ? "Published" : "Pending" }}
      <v-divider class="my-5"></v-divider>
      <v-btn
        v-if="oneSong.published"
        @click="updatePublished(false)"
        color="primary"
        small
        class="mr-2"
      >
        UnPublish
      </v-btn>
      <v-btn
        v-else
        @click="updatePublished(true)"
        color="primary"
        small
        class="mr-2"
      >
        Publish
      </v-btn>
      <v-btn color="error" small class="mr-2" @click="deleteSong">
        Delete
      </v-btn>
      <v-btn color="success" small @click="updateSong"> Update </v-btn>
    </v-form>
    <p class="mt-3">{{ message }}</p>
  </div>
  <div v-else>
    <p>Please click on a Tutorial...</p>
  </div>
</template>
<script>
import songService from "../services/songService";
export default {
  name: "tutorial",
  data() {
    return {
      oneSong: null,
      message: "",
    };
  },
  methods: {
    getSong(id) {
      songService
        .getAsong(id)
        .then((response) => {
          this.oneSong = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /* mounted() {
      this.getSong(this.$route.params.id);
    },*/
    /*methods: {
    getSong(id) {
      songService
        .get(id)
        .then((response) => {
          this.oneSong = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },*/
    updatePublished(status) {
      var data = {
        id: this.oneSong.id,
        title: this.oneSong.title,
        description: this.oneSong.description,
        published: status,
      };
      songService
        .update(this.oneSong.id, data)
        .then((response) => {
          this.oneSong.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateSong() {
      songService
        .update(this.oneSong.id, this.oneSong)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteSong() {
      songService
        .delete(this.oneSong.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getSong(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
 