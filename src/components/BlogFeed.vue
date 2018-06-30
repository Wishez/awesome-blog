<template>
  <transition-group tag="ul" :name="transition"  class="blog__feed">
    <li v-for="(post, index) in feed" class="preview" :key="index">
      <figure class="preview__figure" :class="figureClass" :style="getBgImg(post.preview.image)">
        <transition name="v--fade">
          <figcaption v-if="!reading || $device.phone" class="preview__details">
            <router-link class="preview__title"
              :to="`/read/${post.slug}`"
              @click.native="scrollTo(0, 220, scrollDelay)">
              {{ post.title }}
            </router-link>

            <div class="preview__meta">
              <time class="preview__published">
                {{ prettyDate(post.created_at) }}
              </time>

              <router-link class="preview__author"
                :to="`/by/${kebabify(post.author.username)}`"
                @click.native="scrollTo(0, 220, scrollDelay)">
                {{ post.author.first_name }} {{ post.author.last_name }}
              </router-link>
            </div>
          </figcaption>
        </transition>
      </figure>
    </li>
  </transition-group>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '@/constants/helpers'
export default {
  name: 'blog-feed',
  resource: 'BlogFeed',
  props: {
    filters: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      posts: [],
      transition: 'preview-appear'
    }
  },
  computed: {
    reading() { return this.filters.post },
    scrollDelay() { return (this.$device.phone) ? 0 : 560 },
    figureClass() {
      return { 'preview__figure--mobile': this.$device.phone && this.reading }
    },

    feed() {
      const filterBy = {
        slug: (filter, { slug }) => filter === slug,
        // author: (filter, { author }) => filter === this.kebabify(author.username)
      }

      console.log(this.filters, 'filters');
      if (!Object.keys(this.filters).length) return this.posts

      return this.posts.filter(post => {
        return Object.keys(this.filters).every(filter => {
          return filterBy[filter](this.filters[filter], post)
        })
      })
    }
  },

  methods: {
    scrollTo,
    kebabify,
    prettyDate,

    getBgImg(src) {
      return { backgroundImage: `url(${src})` }
    },

    stackPosts(posts) {
      let interval

      const stack = () => {
        this.posts.push(posts.shift())
        if (!posts.length) {
          this.transition = 'preview'
          clearInterval(interval)
        }
      }

      interval = setInterval(stack, 125)
    }
  },
  beforeMount() {
    this.$store.dispatch('getArticles', {
      silent:false
    })
      .then(posts => {
        if (!Object.keys(this.filters).length) {
          this.stackPosts(posts);
        } else {
          this.posts = posts;
          this.transition = 'preview';
        }
      })
  }
}</script>
