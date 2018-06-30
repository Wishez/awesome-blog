<template>
  <transition appear name="v--mask">
    <footer v-once class="blog__footer">
      Made by
      <a class="signature" href="https://shining-present.ru" target="_blank">
        <!-- <img src="../assets/vue-snip.svg"/> -->
        Filipp Zhuravlev
      </a>
    </footer>
  </transition>
</template>

<script>
export default { name: 'blog-footer' }</script>
