<template>
  <div class="columns is-justify-content-center">
    <div class="banner-container column is-12 is-12-mobile has-text-black">
      <CarouselComponent
        class="banner-img"
        :carouselItems="banner"
      ></CarouselComponent>
    </div>
  </div>
</template>
<script src="./banner.component.ts" />
<style lang="scss" src="./banner.component.scss" />
