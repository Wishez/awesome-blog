import Vue from "vue";
import App from "./App";
import createRouter from "./router";
import createStore from "./store";
import VueDisqus from "vue-disqus";
import { sync } from "vuex-router-sync";

Vue.config.productionTip = true;

Vue.use(VueDisqus);
/* eslint-disable no-new */

const createApp = () => {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
  });

  return { app, router, store };
};

createApp();

export default createApp;
