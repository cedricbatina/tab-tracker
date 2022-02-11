import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Songs from "./components/Songs.vue";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/songs",
      component: Songs,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./views/ProfileBoard.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("./views/AdminBoard.vue"),
    },
    {
      path: "/moderator",
      name: "moderator",
      // lazy-loaded
      component: () => import("./views/ModeratorBoard.vue"),
    },
    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: () => import("./views/UserBoard.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register", "/home"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});

//module.exports = router;
