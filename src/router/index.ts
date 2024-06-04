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
      {
        path: "/team",
        alias: "team",
        name: "team",
        component: () => import("../views/PokemonTeam.vue"),
      },
      {
        path: "/team/:id",
        alias: "detail",
        name: "detail",
        component: () => import("../views/PokemonDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
