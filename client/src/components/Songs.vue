<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>
    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle"> Search </v-btn>
    </v-col>
    <v-col cols="12" sm="12">
      <v-card class="mx-auto" title>
        <v-card-title>Songs</v-card-title>
        <v-data-table
          :headers="headers"
          :items="songs"
          disable-pagination
          :hide-default-footer="false"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="goAndViewSong(item.id)"
              >mdi-eye</v-icon
            >

            <v-icon small class="mr-2" @click="editSongs(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteSong(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>
        <v-card-actions v-if="songs.length > 0">
          <v-btn small color="error" @click="removeAllSongs">
            REMOVE ALL
          </v-btn>
          <v-btn small color="error" @click="goAndAddSong"> ADD A SONG </v-btn>
        </v-card-actions>
      </v-card>
      <div v-if="oneSong">
        <h3>
          I don't know yet why I can't yet* get the render from oneSong.tab I do
          not worry, not at all. I use to find a way to figure out and fix the
          issues and I learn a lot through the process, I am working in
          progress.Just continue working Cédric, You gonna hold it soon!!{{
            oneSong.tab
          }}!!!!!
        </h3>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import songService from "../services/songService";
import SongService from "../services/songService";
export default {
  name: "Song",
  data() {
    return {
      songs: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title" },
        { text: "Artist", value: "artist", sortable: false },
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      oneSong: null,
    };
  },
  methods: {
    retrieveSongs() {
      SongService.getAllSongs()
        .then((response) => {
          this.songs = response.data.songs;
          // this.oneSong = null;
          console.log(response.data);
        })
        .catch((error) => {
          {
            error, "cannot get all songs";
          }
          console.log(error);
        });
    },
    refreshList() {
      this.retrieveSongs();
    },
    removeAllSongs() {
      SongService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    searchTitle() {
      SongService.findByTitle(this.title)
        .then((response) => {
          this.Songs = response.data.songs;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editSongs(id) {
      this.$router.push({ path: "/songs/update/:id", params: { id: id } });
    },
    deleteSongs(id) {
      SongService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteSong(songId) {
      songService
        .deleteSong(songId)
        .then(() => {
          this.refreshList();
        })
        .catch((error) => {
          this.message = error;
        });
    },
    goAndAddSong() {
      this.$router.push("/songs/add");
    },
    goAndViewSong(id) {
      this.$router.push({ path: "/songs/song/:id", params: { id: id } });
    },

    getSong(id) {
      songService
        .getAsong(id)
        .then((response) => {
          this.oneSong = response.data;
          this.$router.push({ path: "/songs/song/:id", params: { id: id } });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /*getDisplaySongs(songs) {
      return {
        id: songs.id,
        title:
          songs.title.length > 30
            ? songs.title.substr(0, 30) + "..."
            : songs.title,
        artist: songs.artist,
        status: songs.published ? "Published" : "Pending",
      };
    },*/
  },
  mounted() {
    this.retrieveSongs();
  },
};
</script>
<style>
.list {
  max-width: 750px;
}
</style>
