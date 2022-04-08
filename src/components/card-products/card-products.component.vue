<template>
  <div
    v-if="item && !isLoading"
    class="card-product is-align-items-center pt-3"
  >
    <img
      :src="`${$env.url}/storage/${item.picture_url}`"
      :alt="item.name"
      width="240px"
      height="240px"
      class="img-product has-text-center cursor-pointer"
      @click="openInfo"
    />
    <span
      class="column is-12 has-text-left ml-2 mt-5 product-name is-uppercase is-size-6 has-text-weight-bold text-monserrat"
      >{{ this.item.name }}</span
    >
    <div class="column mt-4 is-12 ml-2 has-text-white has-text-left pb-3">
      <span class="p-1 is-size-7 product-description text-monserrat">{{
        this.item.sub_category.name
      }}</span>
    </div>
    <button
      v-if="auth.role ? auth.role === 'customer' : true"
      @click="addCart"
      class="button background-black mt-4 has-text-white is-align-self-stretch p-2 btn-shopping-card text-monserrat"
    >
      Añadir al carrito
    </button>
    <div
      v-if="auth ? auth.role === 'admin' : false"
      class="column is-12 is-flex is-justify-content-center is-12-mobile"
    >
      <button
        @click="deleteProduct(item.id)"
        :disabled="disabled"
        class="button button-product-admin background-outside mt-4 has-text-white is-align-self-stretch p-2 mr-4  mb-2 column is-4 is-4-mobile"
      >
        <span class="bi bi-trash is-size-5"></span>
      </button>
      <button
        @click="openEdit"
        class="button button-product-admin background-black mt-4 has-text-white is-align-self-stretch p-2 column mb-2  is-4 is-4-mobile "
      >
        <span class="bi bi-pencil is-size-5"></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" src="./card-products.component.ts" />
<style lang="scss" src="./card-products.component.scss" />
