<template>
  <transition-group tag="div" :name="transition"  class="blog__feed">
    <article v-for="(post, index) in feed"
      :key="index"
      class="preview" >
      <figure class="preview__figure" :class="figureClass" :style="getBgImg(post.preview.image)">
        <transition name="v--fade">
          <figcaption v-if="!reading || $device.phone"
            class="preview__details">
            <h1 class="preview__title parent v-end">
              <router-link :to="`/read/${post.slug}`"
              @click.native="scrollTo(0, 220, scrollDelay)">
                {{ post.title }}
              </router-link>
            </h1>

            <div class="preview__meta">
              <time datetime="post.created_at" class="preview__published">
                {{ prettyDate(post.created_at) }}
              </time>
            </div>

            <transition-group tag="ul" :name="transition"  class="preview__tags">
              <li v-for="(tag, index) in post.tags" :key="index" class="tag">
                <!-- <div class="tag"> -->

                    <!-- <div class="tag-side tag-2-side"> -->
                        <!-- <div class="tag-text tag-2-text"> -->
                            {{ tag }}

                            <!-- <div class="rule-diagonal"></div> -->
                        <!-- </div> -->
                    <!-- </div> -->

                    <!-- <div class="tag-side tag-2-side is-back"> -->
                        <!-- <div class="tag-text tag-2-text"> -->
                            <!-- Another side of the tag -->
                            <!-- <div class="rule-diagonal"></div> -->
                        <!-- </div> -->
                    <!-- </div> -->

                <!-- </div> -->

            </li>
          </transition-group>
          </figcaption>
        </transition>
      </figure>
    </article>
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
        slug: (filter, { slug }) => filter === slug
      }

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
        console.log(this.posts);
      })
  }
}</script>

<style lang="scss">

.preview__tags.preview__tags {
  position: absolute;
  bottom: 102%;
  color: #5285c4;

  left: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
}


.tag {
  border-bottom: 1px dashed #5285c4;
}

</style>
