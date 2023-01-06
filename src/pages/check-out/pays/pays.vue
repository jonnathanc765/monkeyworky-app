<template>
  <!-- TITLE -->
  <div class="check-title">
    <h4
      class="has-text-weight-bold is-size-4 is-size-5-mobile p-4 color-text-dark-gray"
    >
      Métodos de pago
    </h4>
  </div>

  <div class="column is-12 overflow-items p-4">
    <h4
      class="has-text-left color-text-dark-gray is-size-6 is-size-6-mobile has-text-weight-bold"
    >
      BANCOS
    </h4>
    <SpinnerComponent
      :isFull="false"
      :isActive="isActive && banks.length === 0"
      :text="'Cargando el listado de bancos'"
      class="py-6"
    ></SpinnerComponent>

    <div v-if="banks.length > 0" class="column is-12">
      <div
        v-for="item in banks"
        :key="item.bank_id"
        class="column is-inline-flex mt-3 is-align-items-center"
        :class="banks.length === 1 ? 'is-11' : 'is-4'"
      >
        <div class="info-bank-pays has-text-left">
          <span
            class="has-text-weight-bold is-size-6 column is-12 color-text-gray"
            >{{ item.name }}</span
          >
          <span
            class="column is-12 is-size-7 has-text-weight-light color-text-gray"
          >
            <span class="column is-12">
              {{ item.owner }}
            </span>
            <span class="column is-12">
              {{ item.email }}
            </span>
            <span class="column is-12">
              {{ item.dni }}
            </span>
            <span class="column is-12">
              {{ item.phone }}
            </span>
            <span class="column is-12">
              {{ item.account_number }}
            </span>
          </span>
        </div>
        <img
          @click="confirmCopyText(item)"
          class="column is-3 icon-copy-pays mr-5 cursor-pointer"
          :src="`${$env.url}/storage/icons-sky/icons/paper.svg`"
          alt="icon copy"
        />
      </div>
    </div>

    <h4
      v-if="!isActive && banks.length === 0"
      class="color-red pb-1 is-size-7-mobile"
    >
      No se encontraron bancos en el sistema
    </h4>
  </div>
</template>

<script>
import alertBulma from '@/core/global/alert';
import { bankStore } from '../../../store/bank';
import { defineAsyncComponent } from '@vue/runtime-core';
export default {
  components: {
    SpinnerComponent: defineAsyncComponent(() =>
      import('@/components/spinner/spinner.component.vue')
    ),
  },
  async mounted() {
    await bankStore
      .dispatch('get')
      .catch(() => {
        alertBulma(
          'warning',
          'Error',
          'Hubo un problema en la comunicación con el servidor y no se pudieron cargar los bancos, por favor recarga la página'
        );
      })
      .finally(() => {
        this.isActive = false;
      });
  },

  computed: {
    banks() {
      return bankStore.state.banks;
    },
  },
  methods: {
    confirmCopyText(item) {
      this.$copyText(
        `${item.name ? item.name : ''}\n${item.owner ? item.owner : ''}\n${
          item.email ? item.email : ''
        }\n${item.phone ? item.phone : ''}\n${item.dni ? item.dni : ''}\n${
          item.account_number ? item.account_number : ''
        }`
      )
        .then(() => {
          alertBulma(
            'warning',
            'Texto copiado',
            'Hemos copiado los datos del banco en su portapapeles.',
            { label: 'Entendido' }
          );
        })
        .catch(() => {
          alertBulma(
            'warning',
            'Error en la copia',
            'Hubo un error a la hora de copiar el texto.',
            { label: 'Entendido' }
          );
        });
    },
  },
  data() {
    return {
      isActive: true,
    };
  },
};
</script>
