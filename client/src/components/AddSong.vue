<template>
  <div>
    <h1 class="text-center">Thanks for posting your song</h1>

    <v-card v-if="!submitted">
      <v-form name="form" ref="form" class="mx-2">
        <v-row>
          <h2>Song Metadata</h2>

          <v-col
            cols="6"
            sm="12"
            md="6"
            xs="12"
            class="text-center"
            style="height: 100vh"
          >
            <v-flex xs8>
              <v-text-field
                label="Title"
                v-model="song.title"
                required
                :rules="[required]"
                v-validate="'required|min:3|max:15'"
                type="text"
                class="form-control"
                name="title"
              >
              </v-text-field>
              <v-text-field
                label="Artist"
                v-model="song.artist"
                required
                :rules="[required]"
                v-validate="'required|min:3|max:15'"
                type="text"
                class="form-control"
                name="artist"
              >
              </v-text-field
            ></v-flex>
            <v-flex xs8>
              <v-text-field
                label="Album"
                v-model="song.album"
                required
                :rules="[required]"
                v-validate="'required|min:3|max:25'"
                type="text"
                class="form-control"
                name="album"
              >
              </v-text-field>
              <v-text-field
                label="Genre"
                v-model="song.genre"
                required
                :rules="[required]"
                v-validate="'required|min:3|max:15'"
                type="text"
                class="form-control"
                name="genre"
              >
              </v-text-field
            ></v-flex>
            <v-flex xs8>
              <v-text-field
                label="Album image url"
                v-model="song.albumImageUrl"
                required
                :rules="[required]"
                v-validate="'required|min:3|max:15'"
                type="text"
                class="form-control"
                name="albumImageUrl"
              >
              </v-text-field>
              <v-text-field
                label="Youtube Id"
                v-model="song.youtubeId"
                required
                :rules="[required]"
                v-validate="'required|min:3|max:40'"
                type="text"
                class="form-control"
                name="youtubeId"
              >
              </v-text-field></v-flex
          ></v-col>

          <v-col
            cols="6"
            sm="12"
            md="6"
            xs="12"
            class="text-center"
            style="height: 100vh"
          >
            <h2>Song structure</h2>
            <v-flex>
              <v-text-field
                label="Tab"
                v-model="song.tab"
                multi-line
                v-validate="[required]"
                type="textarea"
                class="form-control"
                name="tab"
              >
              </v-text-field>
              <v-textarea
                label="Lyrics"
                v-model="song.lyrics"
                multi-line
                v-validate="[required]"
                type="textaera"
                class="form-control"
                name="lyrics"
              >
              </v-textarea> </v-flex
          ></v-col>

          <v-btn @click="saveSong">SAVE</v-btn></v-row
        >
      </v-form></v-card
    >
    <v-card v-else text-center>
      <h2>Create another song</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore, qui
        eligendi pariatur praesentium error distinctio aliquam assumenda magni!
        Eligendi magnam quod labore culpa aperiam numquam natus reprehenderit
        non iure quidem?
      </p>
      <v-btn @click="newSong">CREATE</v-btn>
    </v-card>
  </div>
</template>

<script>
import songService from "../services/songService";
export default {
  name: "AddSong",
  data() {
    return {
      song: {
        title: "",
        artist: "",
        album: "",
        genre: "",
        albumImageUrl: "",
        youtubeId: "",
        tab: "",
        lyrics: "",
      },
      submitted: "",
      required: (value) => !!value || "required",
    };
  },
  methods: {
    saveSong() {
      let data = {
        title: this.song.title,
        artist: this.song.artist,
        album: this.song.album,
        genre: this.song.genre,
        albumImageUrl: this.song.albumImageUrl,
        youtubeId: this.song.youtubeId,
        lyrics: this.song.lyrics,
        tab: this.song.tab,
      };
      songService
        .createSong(data)
        .then((response) => {
          this.song.id = response.data.id;
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newSong() {
      this.song = {};
      this.submitted = false;
    },
  },
};
</script>

<style>
</style>