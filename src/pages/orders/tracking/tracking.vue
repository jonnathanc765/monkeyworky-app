<template>
  <Modal v-if="isModal" v-on:dismissForm="isModal = false"></Modal>

  <div class="gradient-gray background-monkeys column is-flex is-justify-content-center pb-6">
    <div
      class="column is-5-desktop is-10-mobile is-7-tablet background-gray box-shadow has-text-left h-100 p-0 mr-4 mt-6 pt-6"
    >
      <div class="px-5 py-4 has-text-centered">
        <span class="has-text-weight-bold text-monserrat">Ingresa el número de la orden</span>

        <div class="column is-12 is-relative">
          <input
            type="number"
            v-model="orderId"
            class="pt-4 pb-1 is-size-6 input-border-yellow has-text-centered color-text-dark-gray text-monserrat"
            style="background: transparent !important;"
          />
          <div class="focus-line"></div>
        </div>
      </div>
      <div
        v-if="auth.id"
        class="is-6-desktop is-12-mobile has-text-centered px-4"
      >
        <span
          @click="isModal = true"
          class="is-size-7 color-red cursor-pointer non-selectable text-monserrat"
          >¿No sabes tú número de orden? Búscala aquí</span
        >
      </div>
      <button
        @click="searchOrder"
        :disabled="disabled"
        id="tracking-btn"
        class="column mt-2 is-12 is-12-mobile button background-yellow color-text-black text-monserrat text-bold p-0 "
      >
        Rastrear
      </button>
    </div>
  </div>
</template>

<script src="./tracking.ts" />
