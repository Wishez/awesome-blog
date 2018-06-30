import "./startup";

import Vue from "vue";
import App from "./App";
import router from "./router";
import "./filters";
import "./sass/fonts.sass";
import store from "./store";
import VueDisqus from "vue-disqus";
import deviceQueries from "./plugins/device-queries";

Vue.config.productionTip = false;

Vue.use(deviceQueries, {
  phone: "max-width: 567px",
  tablet: "min-width: 568px",
  mobile: "max-width: 1024px",
  laptop: "min-width: 1025px",
  desktop: "min-width: 1280px",
  monitor: "min-width: 1448px"
});

Vue.use(VueDisqus);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
