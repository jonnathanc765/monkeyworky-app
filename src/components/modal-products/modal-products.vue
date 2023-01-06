<template>
  <div id="modal-products" class="modal modal-products">
    <div class="modal-background"></div>
    <div v-if="item" class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p
          class="modal-card-title is-size-6-mobile text-dark text-monserrat text-black"
        >
          Seleccionar cantidad a agregar
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body" v-if="item.variations">
        <h3 class="py-1 text-monserrat">Producto: {{ item.name }}</h3>
        <h6
          v-if="item.variations.length > 1 || item.variations.length === 0"
          class="color-red py-1 text-monserrat"
        >
          {{
            item.variations.length > 1
              ? ''
              : 'Este producto no está disponible para añadir al carrito'
          }}
        </h6>
        <div
          v-for="row in item.variations"
          :key="row.id"
          class="is-justify-content-center is-align-items-center py-2"
        >
          <span class="mt-1 mb-1 p-2">{{ row.price }}$ | {{ row.size }}</span>
          <input
            v-on:input="addValue(row)"
            v-model="quantity[row.id]"
            :id="`input-${row.id}`"
            type="number"
            min="0"
            class="input column is-3 is-7-mobile px-4"
          />
        </div>
      </section>

      <section class="modal-card-body" v-if="item.variation">
        <h3 class="py-1 text-monserrat">Producto: {{ item.product.name }}</h3>
        <div class="is-justify-content-center is-align-items-center py-2">
          <span class="mt-1 mb-1 p-2"
            >{{ item.variation.price }}$ | {{ item.variation.size }}</span
          >
          <input
            v-on:input="addValue(item.variation)"
            v-model="quantity[item.variation.id]"
            :id="`input-${item.variation.id}`"
            type="number"
            min="0"
            class="input column is-3 is-7-mobile px-4"
          />
        </div>
      </section>

      <footer
        class="modal-card-foot is-flex is-justify-content-center py-2"
        style="border-radius: 0px !important;"
      >
        <button
          v-if="item.variations"
          :disabled="item.variations.length === 0 || disabled"
          @click="addCart"
          id="addCartProduct"
          class="button column is-3 is-8-mobile background-yellow text-dark"
        >
          Añadir
        </button>

        <button
          v-if="item.variation"
          @click="addCart"
          id="addCartProduct"
          class="button column is-3 is-8-mobile background-yellow text-dark"
        >
          Añadir
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./modal-products.ts" />
<style lang="scss" src="./modal-products.scss" />
