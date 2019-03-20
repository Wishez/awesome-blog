<template>
  <transition name="post">
    <article v-if="slug && !isRequesting" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ post.title }}</h2>

        <div class="post__meta color_pale">
          <time :datetime="post.created_at">{{ prettyDate(post.created_at) }}</time>
        </div>

      </header>

      <section class="post__body rte" v-html="post.text"></section>

      <footer class="post__footer">
        <vue-disqus v-if="commentsReady"
          :key="post.slug"
          :identifier="post.slug"
          :url="`https://filipp-zhuravlev.ru/read/${post.slug}`"
          api_key="MCHe9Ysg7zlriEp4hgS0924pvMIs7VRt3I8yLfGehExEKARLqt5mmTKnCNKtcePQ"
          shortname="filipp-zhuravlev"
        />
      </footer>
    </article>
    <p v-else-if="slug" class="loader">Загрузка...</p>
  </transition>
</template>

<script>
import {listenExternalLinks} from '@/constants/events';
import { kebabify, prettyDate, setTitle } from '@/constants/helpers'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  props: { slug: String },

  asyncData({ store, route, methods }) {
    return methods.getArticle(store, route.params.slug)
  },

  data() {
    return {
      commentsReady: false,
      prettyDate,
    }
  },
  watch: {
    slug(to, from) {
      if (to === from || !this.slug || !to) return;

      this.commentsReady = false;
      this.getArticle(this.$store, to)
    }
  },

  computed: {
    isRequesting() { return this.$store.state.isRequesting },
    post() {
      return this.$store.state.post 
    },

    author() {
      return this.$store.state.author
    },
  },

  methods: {
    kebabify,
    showComments() {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    },
  },
  beforeMount() {
    const slug = this.slug;
    if (!slug) return;
    
    if (!this.post.title) this.getArticle(this.$store, slug)
  },

  mounted() {
    listenExternalLinks();
  },

  updated() {
    listenExternalLinks();
    if (this.slug) setTitle(`${this.post.title} | Филипп Журавлёв`)
  },

  methods: {
    getArticle(store, slug) {
      return store.dispatch('getArticle', { slug })
    }
  }
}</script>

<style lang="sass" scoped>
.loader
  text-align: center
</style>
