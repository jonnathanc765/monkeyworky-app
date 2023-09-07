<template>
    <li class="div-categories has-text-white is-size-7">
      <div v-if="item.subcategories.length === 1" @click="category" >
            <div class="icon-box mt-2">
              <img 
                :src="`${$env.url}/images/${item.picture}`"
                class="category-icon cursor-pointer d-block"
              >
            </div>

            <p @click="category" >
              {{ item.name }}
            </p>
      </div>
      <div v-else @click="openCategory">
            <div class="icon-box mt-2">
              <img 
                :src="`${$env.url}/images/${item.picture}`"
                class="category-icon cursor-pointer d-block"
              >
            </div>

            <p>
              {{ item.name }}
            </p>
      </div>
    </li>
</template>

<script src="./categories.component.ts" />
<style lang="scss" src="./categories.component.scss" />
