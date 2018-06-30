<template>
  <transition name="post">
    <article v-if="slug" class="post">
      <header class="post__header">
        <h2 class="post__title">{{ post.title }}</h2>

        <h3 class="post__meta">
          by {{ author.first_name }} {{ author.last_name }}
          <!-- <router-link class="post__author" -->
          <!-- :to="`/by/${kebabify(author.username)}`"></router-link> -->
          <span class="post__sep"></span>
          <time :datetime="post.created_at">{{ prettyDate(post.created_at) }}</time>
        </h3>

        <!-- <blockquote class="post__subtitle">{{ post.announce_text }}</blockquote> -->
      </header>

      <section class="post__body rte" v-html="post.text"></section>

      <footer class="post__footer">
        <vue-disqus v-if="commentsReady" shortname="vue-blog-demo"
          :key="post.slug" :identifier="post.slug" :url="`https://vue-blog-demo.netlify.com/read/${post.slug}`"/>
      </footer>
    </article>
  </transition>
</template>

<script>

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
  }
}</script>
