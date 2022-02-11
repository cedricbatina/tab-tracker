<template>
  <v-app>
    <!--<v-app-bar app class="container modal-header">-->
    <v-app-bar
      app
      class="navbar bg-dark col-sm-12 navbar-expand-xl navbar-dark"
    >
      <a href class="navbar-brand" @click.prevent>Tab-Tracker</a>
      <!--<img
        alt="logo"
        src="./assets/logo_kemshare_white.png"
        class="navbar-brand"
        @click.prevent
      />-->

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <div>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">
                <font-awesome-icon icon="home" /> Home
              </router-link>
            </li>
          </ul>
        </div>
        <div
          v-if="!currentUser"
          class="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Register
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Login
              </router-link>
            </li>
          </ul>
        </div>

        <div
          v-if="currentUser"
          class="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.name }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/songs">Songs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/add">Add</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href @click.prevent="logOut">
                <font-awesome-icon icon="sign-out-alt" /> LogOut
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!--</nav>-->
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.authentication.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("authentication/logout");
      this.$router.push("/");
    },
  },
};
</script>
