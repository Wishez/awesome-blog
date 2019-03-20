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
    slug: String
  },
  data() {
    return {
      navs: 0,
      title: 'Filipp Zhuravlev',
      labels: {
        slug: 'Покинуть режим чтения',
        author: 'Filipp Zhuravlev'
      }
    }
  },

  computed: {
    post() {
      return this.$store.state.post
    },

    content() {
      return { title: this.title, labels: this.labels }
    },

    filters() {
      let filters = {}

      if (this.slug) filters.slug = this.slug

      return filters
    }
  },

  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  }
}</script>
