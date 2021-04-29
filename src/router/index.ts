import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Task from "../views/Task.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "task",
    meta: { layout: "main" },
    component: Task,
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/restoration-password",
    name: "restoration-password",
    meta: { layout: "empty-auth" },
    component: () => import("../views/RestorationPassword.vue"),
  },
  {
    path: "/archive",
    name: "archive",
    meta: { layout: "main" },
    component: () => import("../views/Archive.vue"),
  },
  {
    path: "/been",
    name: "been",
    meta: { layout: "main" },
    component: () => import("../views/Been.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    meta: { layout: "main" },
    component: () => import("../views/Calendar.vue"),
  },
  {
    path: "/chats",
    name: "chats",
    meta: { layout: "main" },
    component: () => import("../views/Chats.vue"),
  },
  {
    path: "/documents",
    name: "documents",
    meta: { layout: "main" },
    component: () => import("../views/Documents.vue"),
  },
  {
    path: "/manager",
    name: "manager",
    meta: { layout: "main" },
    component: () => import("../views/Manager.vue"),
  },
  {
    path: "/plans",
    name: "plans",
    meta: { layout: "main" },
    component: () => import("../views/Plans.vue"),
  },
  {
    path: "/reminder",
    name: "reminder",
    meta: { layout: "main" },
    component: () => import("../views/Reminder.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
