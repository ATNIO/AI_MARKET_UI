import Vue from "vue";
import Router from "vue-router";
import { LoadingBar } from "iview";

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
      path: "/detail/:address",
      name: "detail",
      component: Detail
    }
  ]
});

LoadingBar.config({
  color: "#19be6b",
  failedColor: "#ed3f14",
  height: 4
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next();
});

router.afterEach(() => {
  LoadingBar.finish();
});

export default router;
