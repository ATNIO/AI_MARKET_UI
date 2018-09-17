import Vue from "vue";
import Router from "vue-router";

const Home = () => import("./views/Home.vue");
const Detail = () => import("./views/Detail.vue");
const MyAccount = () => import("./views/MyAccount.vue");
const AccountChannelList = () => import("./views/AccountChannelList.vue");
const AccountProfile = () => import("./views/AccountProfile.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Vue.prototype.$atn == null ? Home : Home
    },
    {
      path: "/detail/:address",
      name: "detail",
      component: Detail
    },
    {
      path: "/my-account",
      name: " my-account",
      component: MyAccount,
      children: [
        {
          path: "AccountChannelList",
          name: "AccountChannelList",
          component: AccountChannelList
        },
        {
          path: "AccountProfile",
          name: "AccountProfile",
          component: AccountProfile
        }
      ]
    }
  ]
});
