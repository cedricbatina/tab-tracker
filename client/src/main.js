import Vue from "vue";
import App from "./App.vue";

//import { required, validate } from "vee-validate/dist/rules.umd.js";

import * as VeeValidate from "vee-validate";
import { ValidationProvider, ValidationObserver } from "vee-validate";

//const router = require("router");
import { router } from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

Vue.config.productionTip = false;
//Vue.use(Vee);
Vue.use(VeeValidate, { events: "input|blur" });
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import { required, minLength } from "vuelidate/lib/validators";
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("required", required);
Vue.component("minLength", minLength);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
