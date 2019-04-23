import Vue from "vue";
import App from "./App.vue";
import NProgress from "vue-nprogress";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

App.use(NProgress);

const nprogress = new NProgress({ parent: ".nprogress-container" });

Vue.config.productionTip = false;

new Vue({
  nprogress,
  router,
  render: h => h(App),
}).$mount("#app");
