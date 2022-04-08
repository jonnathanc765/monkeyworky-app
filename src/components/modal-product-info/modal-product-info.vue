<template>
  <div id="modal-address" class="modal modal-products product-info is-active">
    <div class="modal-background"></div>
    <div class="column is-9 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title has-text-white">
          Información detallada
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section id="section-address" class="modal-card-body">
        <div
          class="column is-2 modal-product-info is-flex-desktop is-block-mobile"
        >
          <img
            :src="`${$env.url}/storage/${item.picture_url}`"
            :alt="item.name"
            width="400px"
            height="400px"
            class="img-product-info"
          />

          <div class="column is-5 mt-6">
            <span
              class="column is-12 has-text-left ml-2 mt-5 color-text-dark-gray is-uppercase is-size-5 has-text-weight-bold"
              >{{ item.name }}</span
            >
            <div
              class="column mt-4 is-12 ml-2 has-text-white has-text-left pb-3"
            >
              <span class="p-1 is-size-6 product-description">
                {{ item.sub_category.name }} ({{
                  item.sub_category.category.name
                }})
              </span>
            </div>
          </div>

          <div class="column is-5 mt-6 pl-2 pr-2">
            <span
              class="column is-12 color-text-dark-gray mt-5 is-uppercase is-size-5 has-text-weight-bold has-text-right"
            >
              Presentaciones
            </span>
            <hr class="hr-red mt-3" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script src="./modal-product-info.ts" />
<style lang="scss" src="./modal-product-info.scss" />
