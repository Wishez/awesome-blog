import Vue from "vue";
import Router from "vue-router";
import Blog from "@/components";

Vue.use(Router);

// https://router.vuejs.org/ru/guide/essentials/history-mode.html#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B3%D1%83%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2
export default function() {
  return new Router({
    mode: "history",
    linkActiveClass: "navLink_active",
    routes: [
      {
        path: "/",
        name: "feed",
        component: Blog
      },
      // {
      //   path: "/by/:author",
      //   name: "author",
      //   props: true,
      //   component: Blog
      // },
      {
        path: "/read/:slug",
        name: "post",
        props: true,
        component: Blog
      }
    ]
  });
}
