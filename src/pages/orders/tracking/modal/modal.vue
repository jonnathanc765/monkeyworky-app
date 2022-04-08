<template>
  <div
    id="modal-address"
    class="modal modal-products modal-tracking-sales is-active"
  >
    <div class="modal-background"></div>
    <div class="column is-11 is-12-mobile modal-card">
      <header class="p-1 px-2 has-text-right background-red">
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body p-4 is-relative">
        <MySales :modal="true"></MySales>
      </section>
    </div>
  </div>
</template>

<script src="./modal.ts" />
<style lang="scss" src="./modal.scss" />
