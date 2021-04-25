import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main" },
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    meta: { layout: "empty" },
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
