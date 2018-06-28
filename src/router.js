import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home.vue");
const Detail = () => import("./views/Detail.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail
    }
  ]
});
