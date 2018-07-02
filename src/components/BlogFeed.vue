<template>
  <transition-group tag="div" :name="transition"  class="blog__feed">
    <article v-for="(post, index) in feed"
      :key="index"
      class="preview"
      :hidden="!post.slug">
      <figure class="preview__figure" :class="figureClass" :style="getBgImg(post.preview)">
        <transition name="v--fade">
          <figcaption v-if="!reading || $device.phone"
            class="preview__details">
            <h1 class="preview__title parent v-end">
                {{ post.title }}
            </h1>

            <router-link :to="`/read/${post.slug}`"
            class="viewArticleLink"
            @click.native="scrollTo(0, 220, scrollDelay)">
              Читать статью
            </router-link>

            <div class="preview__meta">
              <time datetime="post.created_at" class="preview__published">
                {{ prettyDate(post.created_at) }}
              </time>
            </div>

            <transition-group tag="ul" :name="transition"  class="preview__tags parent row wrap">
              <li v-for="(tag, index) in post.tags" :key="index" class="tag">
                {{ tag }}
              </li>
            </transition-group>

            <div v-if="post.announce_text"
              class="previewDescription">
              <div v-html="post.announce_text" class="previewDescription__content">
              </div>
            </div>
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

    getBgImg(preview) {
      const styles = Object.create(null);

      if (preview) {
        styles.backgroundImage = `url(${preview.image})`
      }

      return styles;
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

<style lang="scss" scoped>
.preview {
  &:hover, &:focus {
    .previewDescription {
      z-index: 1;
    }
  }
}
.preview__title  {

  a{
    color: currentColor;
  }
}

.viewArticleLink {
  position: absolute;
  bottom: 102%;
  left: 0;
  transition-duration: 250ms;
}

.previewDescription {

  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  transition-duration: 300ms;
  transition-property: z-index;

  &:hover, &:focus {
    .previewDescription__content {
      transform: translateX(0);
    }
  }

  &__content {
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      font-size: 1.5rem;
      padding: 1.5rem 1rem 2.75rem 1.75rem;
      background-color: rgba(#fff, .9);
      transform: translateX(-100%);
      width: 100%;
      height: 100%;
      will-change: transform;
      transition-duration: 210ms;
      transition-timing-function: cubic-bezier(0.4,0,0.6,1);
      transition-property: transform;
  }
}



.preview__tags.preview__tags {
  position: absolute;
  top: 102%;
  color: #5285c4;
  left: 0;
  margin: 0;
  width: -webkit-fill-available;
}


.tag {
  border-bottom: 1px dashed #5285c4;
  margin-top: 0;
  margin-bottom: 1rem;
  margin-right: 1rem;
}

</style>
