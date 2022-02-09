<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">name</label>
            <input
              v-model="user.name"
              data-vv-validate-on="blur"
              type="text"
              class="form-control"
              name="name"
              placeholder="name"
            /><!--
            <ValidationProvider>
              <input
                v-model="user.name"
                name="name"
                data-vv-validate-on="blur"
                class="form-control"
                placeholder="John"
                type="text"
              />
            </ValidationProvider>-->
            <div v-if="submitted && errors.has('name')" class="alert-danger">
              {{ errors.first("name") }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              type="email"
              class="form-control"
              name="email"
              placeholder="email"
            />
            <!--<ValidationProvider>
              <input
                v-model="user.email"
                data-vv-validate-on="blur"
                tag="email"
                type="email"
                name="email"
                class="form-control"
                placeholder="email
                
              "
              />
            </ValidationProvider>-->
            <div v-if="submitted && errors.has('email')" class="alert-danger">
              {{ errors.first("email") }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              name="password"
              placeholder="password"
            /><!--
            <ValidationProvider>
              <input
                v-model="user.password"
                data-vv-validate-on="blur"
                type="password"
                name="password"
                class="form-control"
                placeholder="password"
              />
            </ValidationProvider>-->
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >
              {{ errors.first("password") }}
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" type="submit">
              Sign Up
            </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
//import { reactive } from "vue";
//import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      // errors: "Something went wrong!",
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.authentication.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("authentication/register", this.user).then(
            (data) => {
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
              console.log(error);
            }
          );
        }
      });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

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