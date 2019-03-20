<template>
  <transition appear name="v--mask">
    <footer v-once class="blog__footer parent centered row wrap">
      <article class="about grow">

        <h2 class="about__title">Привет!</h2>
        <p class="about__paragraph">Меня зовут Филипп Журавлёв! Я front-end разработчик, художник и пианист. Сюда пишу о том, что знаю и в основном это техническая информация. </p>
        <picture class="order_first about__avatar">
            <source srcset="../assets/avatar.jpg" media="screen">
            <img src="../assets/avatar.jpg" alt="">
        </picture>
      </article>

      <ul role="navigation" class="linksList" aria-label="Список внешних ссылок">
        <li class="linksList__item">
          <a class="parent v-centered" href="https://shining-present.ru" target="_blank">
            <span aria-hidden="true" class="icon">
              💼
            </span>

            Портфолио
          </a>
        </li>

        <li class="linksList__item">
          <a  class="parent v-centered" href="mailto:shiningfinger@list.ru">
            <span aria-hidden="true" class="icon">
              📧
            </span>
            Email
          </a>
        </li>

        <li class="linksList__item">
          <a class="parent v-centered" href="http://github.com/Wishez" target="_blank">
            <span aria-hidden="true" class="icon">
              <svg viewBox="0 0 16 16">
                <path d="M7.999,0.431c-4.285,0-7.76,3.474-7.76,7.761 c0,3.428,2.223,6.337,5.307,7.363c0.388,0.071,0.53-0.168,0.53-0.374c0-0.184-0.007-0.672-0.01-1.32 c-2.159,0.469-2.614-1.04-2.614-1.04c-0.353-0.896-0.862-1.135-0.862-1.135c-0.705-0.481,0.053-0.472,0.053-0.472 c0.779,0.055,1.189,0.8,1.189,0.8c0.692,1.186,1.816,0.843,2.258,0.645c0.071-0.502,0.271-0.843,0.493-1.037 C4.86,11.425,3.049,10.76,3.049,7.786c0-0.847,0.302-1.54,0.799-2.082C3.768,5.507,3.501,4.718,3.924,3.65 c0,0,0.652-0.209,2.134,0.796C6.677,4.273,7.34,4.187,8,4.184c0.659,0.003,1.323,0.089,1.943,0.261 c1.482-1.004,2.132-0.796,2.132-0.796c0.423,1.068,0.157,1.857,0.077,2.054c0.497,0.542,0.798,1.235,0.798,2.082 c0,2.981-1.814,3.637-3.543,3.829c0.279,0.24,0.527,0.713,0.527,1.437c0,1.037-0.01,1.874-0.01,2.129 c0,0.208,0.14,0.449,0.534,0.373c3.081-1.028,5.302-3.935,5.302-7.362C15.76,3.906,12.285,0.431,7.999,0.431z"></path>
              </svg>
            </span>

            Github
          </a>
        </li>
      </ul>
    </footer>
  </transition>
</template>

<script>
export default { name: 'blog-footer' }</script>

<style lang="scss" scoped>
.linksList {
  margin-top: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 769px) {
    min-width: 100%;
  }

  &__item {
    margin-top: 1rem;
  }
}

.icon  {
  min-width: 21px;
  margin-right: .4rem;

  svg {
    max-width: 21px;
    fill: #bbd9ff;
  }
}

.about {
  max-width: 90ch;

  &__avatar {
    border-radius: 50%;
    height: 200px;
    width: 200px;
    box-shadow: 0 0 6px rgba(0,0,0,.4);
    overflow: hidden;
    grid-column: span 1;
    grid-row: span 2;
    justify-self: center;
  }

  &__paragraph {

    @media (min-width: 769px) {
      transform: translateY(-1.5em);
    }
  }
}

</style>
