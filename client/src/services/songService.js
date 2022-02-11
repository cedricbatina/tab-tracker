import api from "./Api";

class SongService {
  getAllSongs() {
    return api().get("/songs");
  }
  getAsong(id) {
    return api().get(`/songs/${id}`);
  }
  createSong(data) {
    return api().post("/songs", data);
  }
  updateSong(id, data) {
    return api().put(`/songs/${id}`, data);
  }
  deleteSong(id) {
    return api().delete(`/songs/${id}`);
  }
  deleteAll() {
    return api().delete(`/songs`);
  }
  findByTitle(title) {
    return api().get(`/songs?title=${title}`);
  }
}
export default new SongService();
