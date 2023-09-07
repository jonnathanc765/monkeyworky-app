<template>
  <div class="container">
    <div class="box">
      <div class="is-flex carousel__item">
        <figure class="is-flex">
          <img
            @mousedown="pause"
            @mouseup="resume"
            class="parallax-slider z-index non-selectable"
            loading="lazy"
            id="imgSrc"
            :src="
              carouselItems
                ? !isMobile
                  ? $env.url + '/' + currentItem.img
                  : $env.url + '/' + currentItem.imgPhone
                : ''
            "
          />
        </figure>
      </div>
      <nav class="pagination banner">
        <a
          class="button btn-carousel z-index btn-carousel-left"
          @click="prevItem"
        >
          <img
            width="34px"
            height="34px"
            loading="lazy"
            :src="`${$env.url}/images/icons-sky/icons/flecha-izquierda.png`"
            class="btn-img-carousel"
            alt="Botón izquierda"
          />
        </a>
        <a
          class="button btn-carousel z-index btn-carousel-rigth"
          id="nextItem"
          @click="nextItem"
        >
          <img
            width="34px"
            height="34px"
            loading="lazy"
            :src="`${$env.url}/images/icons-sky/icons/flecha-izquierda.png`"
            class="btn-img-carousel btn-rigth-carousel"
            alt="Botón derecha"
          />
        </a>
      </nav>
    </div>
  </div>
</template>

<script src="./carousel.component.ts" />
<style lang="scss" src="./carousel.component.scss" />
