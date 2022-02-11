<template>
  <v-row justify="center" align="center" class="row">
    <v-col
      cols="6"
      sm="12"
      md="6"
      xs="12"
      class="text-center"
      style="height: 100vh"
    >
      <h1>Welcome to the tab-tracker application</h1>
      <p>
        If you are new here, please complete this form to create your account.
        Otherwise please log in to get full access to your account
      </p>
      <!--<h1>
        Your account have successfully been created. Thanks for using
        tab-tracker app!
      </h1>-->
    </v-col>
    <v-col
      cols="6"
      sm="12"
      md="6"
      xs="12"
      class="text-center dark"
      style="height: 100vh"
    >
      <v-card class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <v-form
          name="form"
          ref="form"
          class="mx-2"
          @submit.prevent="handleRegister"
        >
          <div v-if="!successful">
            <div class="form-group">
              <v-text-field
                :rules="nameRules"
                label="name"
                v-model="user.name"
                v-validate="'required|min:3|max:10'"
                data-vv-validate-on="blur"
                type="text"
                class="form-control"
                name="name"
              >
              </v-text-field>

              <div v-if="submitted && errors.has('name')" class="alert-danger">
                {{ errors.first("name") }}
              </div>
            </div>
            <div class="form-group">
              <v-text-field
                :rules="emailRules"
                label="email"
                v-model="user.email"
                v-validate="'required|min:6|max:40'"
                type="email"
                class="form-control"
                name="email"
                placeholder="email"
              >
              </v-text-field>

              <div v-if="submitted && errors.has('email')" class="alert-danger">
                {{ errors.first("email") }}
              </div>
            </div>
            <div class="form-group">
              <v-text-field
                :rules="passwordRules"
                label="password"
                v-model="user.password"
                v-validate="'required|min:6|max:40'"
                type="password"
                class="form-control"
                name="password"
              >
              </v-text-field>

              <div
                v-if="submitted && errors.has('password')"
                class="alert-danger"
              >
                {{ errors.first("password") }}
              </div>
            </div>
            <v-checkbox
              v-model="firstcheckbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="I agree with Terms and Conditions"
              required
            ></v-checkbox>

            <v-checkbox
              v-model="secondcheckbox"
              :rules="[(v) => !!v || 'You must agree to receive!']"
              label="I want to receive from tab-tracker"
              required
            ></v-checkbox>
            <div class="form-group">
              <br />
              <button class="btn btn-primary btn-block">REGISTER</button>
            </div>
          </div>
        </v-form>

        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import User from "../models/user";
//import Panel from "../components/Panel.vue";
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
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
          "Password must contain at least a lowercase letter, one number, a special character and one uppercase letter",
      ],
      firstcheckbox: false,
      secondcheckbox: false,
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
  // components: { Panel,
  // },
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