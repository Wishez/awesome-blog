import Vue from "vue";
import "./startup";
import "./filters";
import "./sass/fonts.sass";
import createApp from "./create-app";
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

const { store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
