import type { RouteRecordRaw } from "vue-router";
// 后续将使用webpack将组件分组 /* webpackChunkName: "组名" */
export const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "/createJob",
        name: "createJob",
        component: () => import("@/views/createJob.vue"),
      },
      {
        path: "/jobsList",
        name: "jobsList",
        component: () => import("@/views/jobsList.vue"),
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("@/views/LoginView.vue"),
  },
];
