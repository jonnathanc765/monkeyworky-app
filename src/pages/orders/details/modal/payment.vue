<template>
  <div id="modal-payment" class="modal modal-payment" :class="{'is-active': show }">
    <div class="modal-background"></div>
    <div class="column is-6 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p
          class="modal-card-title is-size-6-mobile text-dark text-monserrat text-black"
        >
          Detalles de pago
        </p>
        <button @click="dimiss" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="row">
          <div class="row">
            <div class="col-md-12">
              <h2 class="mb-3">
                <strong>Detalles de pago</strong>
              </h2>
              <ul class="mb-3">
                <li>Banco: {{ payment.bank.name }}</li>
                <li>Destino: {{ payment.destination }}</li>
                <li>Propietario: {{ payment.owner }}</li>
                <li>Referencia: {{ payment.reference }}</li>
              </ul>
            </div>
          </div>
          <div class="col-md-12">
            <h2 class="mb-3">
              <strong>Comprobante de pago</strong>
            </h2>
            <img :src="`${$env.url}/storage/${payment.voucher}`" class="w-100">
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script lang="ts">
import { SetupContext } from '@vue/runtime-core';

export default {
  props: {
    show: {
      required: true,
      type: Boolean
    },
    payment: {
      required: true,
      type: Object,
    }
  },
  setup(_: any, context: SetupContext) {
    const dimiss = () => {
      context.emit('dimissModal')
    }
    return {
      dimiss
    }
  },
}
</script>