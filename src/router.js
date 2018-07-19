import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    }
  ]
});

export default router;
