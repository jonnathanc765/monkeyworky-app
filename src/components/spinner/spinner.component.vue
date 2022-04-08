<template>
  <div
    v-if="isActive"
    :class="[
      isFull ? 'loader-wrapper-full' : 'loader-wrapper',
      isActive ? 'is-active' : ''
    ]"
  >
    <div class="loader is-loading"></div>
    <h2
      v-if="text"
      class="mt-5 is-size-5 is-size-6-mobile is-size-6-tablet"
      :class="isFull ? 'has-text-white' : 'color-black'"
    >
      {{ text }}
    </h2>
  </div>
</template>

<script src="./spinner.component.ts" />
<style lang="scss" src="./spinner.component.scss" />
