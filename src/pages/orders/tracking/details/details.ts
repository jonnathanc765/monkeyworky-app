import { computed } from '@vue/runtime-core';
import { orderStore } from '../../../../store/order';
import { onMounted, ref, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import alertBulma from '../../../../core/global/alert';
import { textDetails } from '../../../../core/global/statusOrder';
import moment from 'moment';
export default {
  components: {
    SpinnerComponent: defineAsyncComponent(() =>
      import('@/components/spinner/spinner.component.vue')
    ),
  },
  setup() {
    const details = computed(() => {
      return orderStore.state.details;
    });

    const isActive = ref(true);
    const route = useRoute();

    onMounted(async () => {
      isActive.value = true;
      await orderStore
        .dispatch('tracking', route.params.id)
        .catch((error) => {
          if (error.status === 404) {
            alertBulma(
              'warning',
              'Rastrear mi pedido',
              'No se encontró el número de orden ingresado'
            );
            return;
          }
          alertBulma(
            'warning',
            'Rastrear mi pedido',
            'Hubo un problema con el servidor a la hora de buscar la orden'
          );
        })
        .finally(() => {
          isActive.value = false;
        });
    });

    const text = (status: string) => {
      return textDetails(status);
    };

    const dateParse = (date: any) => {
      return moment(date).format('DD/MM/YYYY - hh:mm');
    };

    return { details, isActive, text, dateParse };
  },
};
