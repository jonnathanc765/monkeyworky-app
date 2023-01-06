<template>
  <div id="modal-my-sales" class="modal modal-products">
    <div class="modal-background"></div>
    <div class="column modal-my-sales is-7 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title has-text-white">Registrar pago</p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section
        @scroll="event($event)"
        id="section-my-sales"
        class="modal-card-body is-relative"
      >
        <RegisterPay :isModal="true" :amount="amount"></RegisterPay>

        <span
          v-if="arrowVisible"
          @click="arrow"
          class="bi bi-arrow-down-circle-fill color-red cursor-pointer arrow-moda-my-sales is-size-3"
        ></span>
      </section>
      <footer class="modal-card-foot is-flex is-justify-content-center py-2">
        <button
          @click="addPay"
          :disabled="disabled"
          class="button column is-3 is-8-mobile background-yellow has-text-white"
        >
          Añadir pago
        </button>
      </footer>
    </div>
  </div>
</template>

<script src="./modal.ts" />
<style lang="scss" src="./modal.scss" />
