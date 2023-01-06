import { checkOut } from '@/store/checkOut';
import { ref, onMounted, defineAsyncComponent } from 'vue';
import alertBulma from '../../../core/global/alert';
import { computed } from '@vue/runtime-core';
import { addressStore } from '../../../store/address';

export default {
  components: {
    Modal: defineAsyncComponent(() => {
      return import('@/pages/check-out/address/modal/modal.vue');
    }),
  },
  setup() {
    const isActive = ref(true);
    const isVisible = ref(false);

    onMounted(() => {
      addressStore
        .dispatch('get')
        .catch(() => {
          alertBulma(
            'warning',
            'Error',
            'Hubo un problema con la comunicación del servidor a la hora de cargar las direcciones, por favor recarga la página'
          );
        })
        .finally(() => {
          isActive.value = false;
        });
    });

    const addresses = computed(() => {
      console.log(addressStore.state.addresses);
      return addressStore.state.addresses;
    });

    const addressId = computed(() => {
      return checkOut.state.addressId;
    });

    const select = (event: any) => {
      const values = addresses.value.find(
        (res: any) => res.address_id === Number(event.target.value)
      );
      if (values) {
        checkOut.commit('setAddressId', event.target.value);
      }
    };

    const dismissForm = () => {
      isVisible.value = false;
    };

    return { select, addresses, isVisible, dismissForm, addressId };
  },
};
