import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Notes from "../views/Notes.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Notes",
    meta: { layout: "main" },
    component: Notes,
  },
  {
    path: "/reminder",
    name: "Reminder",
    meta: { layout: "main" },
    component: () => import("../views/Reminder.vue"),
  },
  {
    path: "/documents",
    name: "Documents",
    meta: { layout: "main" },
    component: () => import("../views/Documents.vue"),
  },
  {
    path: "/plans",
    name: "Plans",
    meta: { layout: "main" },
    component: () => import("../views/Plans.vue"),
  },
  {
    path: "/chats",
    name: "Chats",
    meta: { layout: "main" },
    component: () => import("../views/Chats.vue"),
  },
  {
    path: "/manager",
    name: "CostManager",
    meta: { layout: "main" },
    component: () => import("../views/CostManager.vue"),
  },
  {
    path: "/calendar",
    name: "Calendar",
    meta: { layout: "main" },
    component: () => import("../views/Calendar.vue"),
  },
  {
    path: "/archive",
    name: "Archive",
    meta: { layout: "main" },
    component: () => import("../views/Archive.vue"),
  },
  {
    path: "/basket",
    name: "Basket",
    meta: { layout: "main" },
    component: () => import("../views/Basket.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
