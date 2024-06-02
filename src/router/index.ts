import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../layout/Layout.vue"),
    children: [
      {
        path: "/",
        alias: "home",
        name: "home",
        component: () => import("../views/Pokemons.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
