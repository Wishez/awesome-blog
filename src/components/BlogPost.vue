<template>
  <transition name="post">
    <article v-if="slug" class="post">
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
  </transition>
</template>

<script>
import {listenExternalLinks} from '@/constants/events';
import { kebabify, prettyDate } from '@/constants/helpers'
export default {
  name: 'blog-post',
  resource: 'BlogPost',
  props: { slug: String },

  data() {
    return {
      post: {},
      author: {},
      commentsReady: false
    }
  },
  watch: {
    slug(to, from) {
      if (to === from || !this.slug || !to) return;

      this.commentsReady = false;

      this.$store.dispatch('getArticle', {
        slug: to,
        silent:false
      }).then(post => {
        this.setPostData(post);
        this.showComments();
      })
    }
  },
  methods: {
    kebabify,
    prettyDate,
    showComments() {
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    },

    setPostData(post) {
      this.post = post;
      this.author = post.author;
    }
  },
  beforeMount() {
    const slug = this.slug;

    if (!slug) return;

    this.$store.dispatch('getArticle', {
      slug,
      silent:false
    }).then(post => {
      this.setPostData(post)
    }).catch(error => {
      console.log(error);
    })
  },

  mounted() {
    listenExternalLinks();
  },

  updated() {
    listenExternalLinks();
  }
}</script>
