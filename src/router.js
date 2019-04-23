import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import UsersIndex from "./views/Users/index.vue";
import UsersEdit from "./views/Users/edit.vue";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/users", name: "user-index", component: UsersIndex },
    { path: "/users/edit/:id", name: "user-edit", component: UsersEdit }
  ]
});
