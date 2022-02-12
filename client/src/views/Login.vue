<template>
  <v-container fluid class="fluid">
    <v-row justify="center" align="center" class="row">
      <v-col
        cols="6"
        sm="12"
        md="6"
        xs="12"
        class="text-center"
        style="height: 100vh"
      >
        <h1>Welcome to the tab-tracker app</h1>
        <p>Please complete this form to get access to your account</p>
      </v-col>
      <v-col
        cols="6"
        sm="12"
        md="6"
        xs="12"
        class="text-center"
        style="height: 100vh"
      >
        <v-card class="card card-container">
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
              <v-text-field
                label="name"
                v-model="user.name"
                v-validate="'required|min:3|max:10'"
                type="text"
                class="form-control"
                name="name"
              >
              </v-text-field>

              <div
                v-if="errors.has('name')"
                class="alert alert-danger"
                role="alert"
              >
                name is required!
              </div>
            </div>
            <div class="form-group">
              <v-text-field
                label="password"
                v-model="user.password"
                v-validate="'required'"
                type="password"
                class="form-control"
                name="password"
              >
              </v-text-field>

              <div
                v-if="errors.has('password')"
                class="alert alert-danger"
                role="alert"
              >
                Password is required!
              </div>
            </div>
            <br />
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Login</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>
          </form>
        </v-card>
      </v-col>
    </v-row></v-container
  >
</template>
<script>
//import Panel from "../components/Panel.vue";
import User from "../models/user";
export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.authentication.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.user.name && this.user.password) {
          this.$store.dispatch("authentication/login", this.user).then(
            () => {
              this.$router.push("/profile");
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    },
  },
  //components: { Panel },
};
</script>
<style scoped>
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>