<template>
  <div class="out" id="app">
    <blog-nav :content="content" :filters="filters" :navs="navs"/>

    <main class="blog" :class="{ 'blog--reading': slug }">
      <blog-feed :filters="filters" :slug="slug"/>
      <blog-post :slug="slug"/>
    </main>

    <blog-footer />
  </div>
</template>

<script>
import BlogNav from './BlogNav'
import BlogFooter from './BlogFooter'
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'

export default {
  name: 'blog',
  components: { BlogFeed, BlogPost, BlogNav, BlogFooter },
  resource: 'Blog',
  props: {
    slug: String,
    // author: String
  },
  data() {
    return {
      navs: 0,
      title: 'Filipp Zhuravlev',
      labels: {
        slug: '',
        author: 'Filipp Zhuravlev'
      }
    }
  },
  computed: {
    content() {
      return { title: this.title, labels: this.labels }
    },

    filters() {
      let filters = {}

      if (this.slug) filters.slug = this.slug
      // if (this.author) filters.author = this.author

      console.log(this.slug);
      return filters
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },
  beforeMount() {
    this.$store.dispatch('getArticles', {silent:false})
      .then(posts => { console.log(posts);})
    // this.$getResource('blog')
  }
}</script>
