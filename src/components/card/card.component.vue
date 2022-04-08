<template>
  <div class="column is-3 div-card mt-4 is-inline-flex">
    <div class="is-block div-card-father w-100">
      <div class="img-card">
        <img :src="`${$env.url}/${item.img}`" alt="Imagen" />
      </div>
      <div class="content has-text-white m-3">
        <span
          class="has-text-white m-3 is-size-7 has-text-centered is-uppercase has-text-weight-bold"
          >{{ item.title }}</span
        >
        <p class="is-size-7 has-text-weight-normal">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script src="./card.component.ts" />
<style lang="scss" src="./card.component.scss" />
