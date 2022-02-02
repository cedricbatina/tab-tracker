import Api from "./Api";
import AuthenticationHeader from "./AuthenticationHeader";

class UserService {
  publicContent() {
    return Api().get("all");
  }
  userBoard() {
    return Api().get("user", { headers: AuthenticationHeader() });
  }
  moderatorBoard() {
    return Api().get("mod", { headers: AuthenticationHeader() });
  }
  adminBoard() {
    return Api().get("admin", { headers: AuthenticationHeader() });
  }
}

export default new UserService();
