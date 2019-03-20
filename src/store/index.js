import Vue from "vue";
import Vuex from "vuex";
import service from "@/api";

Vue.use(Vuex);

export default function() {
  return new Vuex.Store({
    modules: {},
    state: {
      csrftoken: Cookies.get("csrftoken"),
      notFound: false,
      isRequesting: false,
      posts: [],
      post: {},
      author: {}
    },
    mutations: {
      raise404(state) {
        state.notFound = true;
      },

      setRequestState(state, isRequesting) {
        state.isRequesting = isRequesting;
      },

      setPost(state, post) {
        state.post = post;
        state.author = post.author;
        state.isRequesting = false;
        state.notFound = false;
      },

      setPosts(state, posts) {
        state.posts = posts;
        state.isRequesting = false;
        state.notFound = false;
      }
    },

    actions: {
      getArticles({ commit }, silent = false) {
        commit("setRequestState", !silent);

        return service.getArticles().then(posts => commit("setPosts", posts));
      },

      getArticle({ commit }, { slug, silent = false }) {
        commit("setRequestState", !silent);

        return service.getArticle(slug).then(post => commit("setPost", post));
      }
    }
  });
}
