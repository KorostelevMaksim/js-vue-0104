import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "home", component: Home },
    {
      path: "/users/",
      name: "user-index",
      component: () => import("./pages/User/index.vue")
    },
    {
      path: "/users/create",
      name: "user-create",
      component: () => import("./pages/User/create.vue")
    },
    {
      path: "/users/edit/:id",
      name: "user-edit",
      component: () => import("./pages/User/edit.vue")
    }
  ]
});
