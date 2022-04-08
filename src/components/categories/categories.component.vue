<template>
    <li class="div-categories has-text-white is-size-7">
      <div v-if="item.subcategories.length === 0" @click="category" >
            <div class="icon-box">
              <img 
                :src="`${$env.url}/storage/${item.picture}`"
                class="category-icon cursor-pointer d-block"
              >
            </div>

            <p class="is-uppercase" @click="category" >
              {{ item.name }}
            </p>
      </div>
      <div v-else @click="openCategory">
            <div class="icon-box">
              <img 
                :src="`${$env.url}/storage/${item.picture}`"
                class="category-icon cursor-pointer d-block"
              >
            </div>

            <p class="is-uppercase">
              {{ item.name }}
            </p>
      </div>
    </li>
</template>

<script src="./categories.component.ts" />
<style lang="scss" src="./categories.component.scss" />
