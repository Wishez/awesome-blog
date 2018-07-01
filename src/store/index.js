import Vue from "vue";
import Vuex from "vuex";
import service from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
  state: {
    csrftoken: Cookies.get("csrftoken"),
    notFound: false,
    isRequesting: false
  },
  mutations: {
    raise404(state) {
      state.notFound = false;
    },

    setRequestState(state, isRequesting) {
      state.isRequesting = isRequesting;
    }
  },

  actions: {
    getArticles({ commit, state }, { silent = false }) {
      commit("setRequestState", !silent);

      return service
        .getArticles()
        .then(response => {
          if (!Array.isArray(response)) {
            state.notFound = true;

            return false;
          } else {
            return response;
          }
        })
        .then(response => {
          if (response) {
            state.notFound = false;
            commit("setRequestState", false);

            return response;
          }
        });

      commit("fetchData", {
        request: service.getArticles(),
        silent
      });
    },

    getArticle({ commit, state }, { slug, silent = false }) {
      commit("setRequestState", !silent);

      return service.getArticle({ slug }).then(response => {
        if (response) {
          state.notFound = false;
          commit("setRequestState", false);

          return response;
        }
      });
    }
  }
});
