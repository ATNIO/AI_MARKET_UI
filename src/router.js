import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home.vue");
const Detail = () => import("./views/Detail.vue");

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/detail/:dbot",
      name: "detail",
      component: Detail
    }
  ]
});

export default router;
