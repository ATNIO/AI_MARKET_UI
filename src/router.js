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
      path: "/detail/:id",
      name: "detail",
      component: Detail
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach(() => {});

export default router;
