import Api from "./Api";

class AuthenticationService {
  login(user) {
    return Api()
      .post("login", {
        name: user.name,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return Api().post("register", {
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthenticationService();
