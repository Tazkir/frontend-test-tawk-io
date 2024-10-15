import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomeView from "./views/HomeView.vue";
import CategoryDetailsView from "./views/CategoryDetailsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      props: true,
    },
    {
      path: "/category/:id",
      name: "CategoryDetails",
      component: CategoryDetailsView,
      props: (route) => ({
        id: route.params.id,
      }),
    },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
