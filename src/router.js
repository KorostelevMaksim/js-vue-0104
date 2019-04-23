import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./pages/Home.vue"),
    },
    {
      path: "/users/",
      name: "user-index",
      component: () => import("./pages/User/index.vue"),
    },
    {
      path: "/users/create",
      name: "user-create",
      component: () => import("./pages/User/create.vue"),
    },
    {
      path: "/users/edit/:id",
      name: "user-edit",
      component: () => import("./pages/User/edit.vue"),
    },
  ],
});

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
