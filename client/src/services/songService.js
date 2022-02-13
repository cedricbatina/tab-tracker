import api from "./Api";

class SongService {
  getAllSongs() {
    return api().get("/songs");
  }
  onlySongsFromUser() {
    return api().get("/songs/user/:userId");
  }
  getAsong(id) {
    return api().get(`/songs/song/${id}`);
  }
  createSong(data) {
    return api().post("/songs/add", data);
  }
  updateSong(id, data) {
    return api().put(`/songs/update/${id}`, data);
  }
  deleteSong(id, data) {
    return api().delete(`/songs/delete/${id}`, data);
  }
  deleteAll() {
    return api().delete(`/songs`);
  }
  findByTitle(title) {
    return api().get(`/songs?title=${title}`);
  }
}
export default new SongService();
