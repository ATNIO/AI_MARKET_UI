import Vue from "vue";
import Router from "vue-router";

import ProgressBar from "@/components/ProgressBar.vue";

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

const instance = new Vue({
  render(h) {
    return h(ProgressBar);
  }
});
const component = instance.$mount();
const progress_bar = instance.$children[0];

document.body.appendChild(component.$el);

router.beforeEach((to, from, next) => {
  progress_bar.start();
  next();
});

router.afterEach(() => {
  progress_bar.finish();
});

export default router;
