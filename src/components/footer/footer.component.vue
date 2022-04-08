<template>
<div class="gradient-gray">
  <div
    class="columns is-justify-content-center footer-class py-2"
    :class="toggled ? 'space' : 'not-space'"
  >
      <!-- CATEGORIES -->
    <div class="column is-2 pl-3 pr-3 mt-4 has-text-left has-text-centered-mobile">
        <img :src="`${$env.url}/storage/icons-sky/icons/icon_footer.png`" style="display:block; width: 50%; margin:auto;">
    </div>

    <!-- CATEGORIES -->
    <div class="column is-2 pl-3 pr-3 mt-4 has-text-left has-text-centered-mobile">
      <span
        v-if="categories"
        class="color-white is-uppercase is-size-5 letter-spacing-1 has-text-weight-bold text-monserrat text-bold"
        >NOSOTROS</span
      >
      <ul
        v-if="categories"
        class="has-text-white has-text-light mt-3 mb-3 cursor-pointer"
      >
          <li class="mt-2 is-capitalized categories-footer text-monserrat">¿Quienes somos? </li>
          <li class="mt-2 is-capitalized categories-footer text-monserrat">Ser aliado comercial</li>
      </ul>
    </div>
    <!-- CONTACTS -->
    <div class="column is-3 mt-4 pl-3 pr-3 has-text-left has-text-centered-mobile">
      <span
        class="color-white is-uppercase is-size-5 letter-spacing-1 has-text-weight-bold text-monserrat text-bold"
        >CONTACTO</span
      >
      <ul class="has-text-white has-text-light mt-3 mb-3">
          <li class="mt-4 text-monserrat">(0212) 000 0000</li>
          <li class="mt-4 text-monserrat">+58 000 000 0000</li>
          <li class="mt-4 text-monserrat">Info@monkeyworky.com</li>
      </ul>
    </div>
    <!-- SOCIALS -->
    <div class="column is-3 mt-4 pl-3 pr-3 has-text-left has-text-centered-mobile">
      <span
        class="color-white is-uppercase is-size-5 letter-spacing-1 has-text-weight-bold text-monserrat text-bold"
        >En la web</span
      >
      <ul class="has-text-white has-text-light mt-3 mb-3">
        <li v-for="item in socials" :key="item.id" class="mt-4">
          <a
            :href="item.url"
            target="_blank"
            class="icon-text icon-footer"
            :rel="item.text"
          >
            <span class="icon-text">
              <span class="icon is-size-4 mr-3">
                <i :class="item.icon"></i>
              </span>
              <span>{{ item.text }}</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="column is-12 mt-4 pl-3 pr-3 has-text-center has-text-centered color-text-white text-monserrat p-2">
        Monkey Worky  C.A. Rif  J12345678<br>
        Av. 1 con Av. La principal - Caracas 3001<br>
        Todos los derechos reservados<br>
  </div>
</div>
</template>

<script src="./footer.component.ts" />
<style lang="scss" src="./footer.component.scss" />
