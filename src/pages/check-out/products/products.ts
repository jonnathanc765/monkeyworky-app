import { SetupContext } from '@vue/runtime-core';
import { cartStore } from '../../../store/cart';
import { useStore } from 'vuex';
import alertBulma from '../../../core/global/alert';
import { ref, onMounted } from 'vue';
import { addClassValidation } from '../../../core/global/validation';
import { useRoute, useRouter } from 'vue-router';

export default {
  props: ['products', 'order', 'cart'],

  setup(props: any, context: SetupContext) {
    const authStore = useStore();
    const disabled = ref([] as any);

    const textValues = (row: any, index: number) => {
      switch (index) {
        case 0:
          return row.variation
            ? `${row.product.name} (${row.variation.size})`
            : `${row.product.name} (${row.size})`;
        case 1:
          return row.quantity;
        case 2:
          return row.variation ? `$${row.variation.price}` : `${row.price}`;
      }
    };

    onMounted(() => {
      disabled.value = [];
    });

    const addCart = (product: any) => {
      console.log('enviando datos de product');
      context.emit('getItem', product);
      addClassValidation('#modal-products', ['is-active']);
    };

    const textProuct = (row: any, index: number) => {
      switch (index) {
        case 0:
          return `#${row.product.id}`;
        case 1:
          return 'Cantidad';
        case 2:
          return row.variation ? `Precio` : '';
      }
    };

    const deleteItem = async (id: number, cartId: number) => {
      disabled.value[id] = 4;
      if (authStore.getters.isAuth) {
        await cartStore
          .dispatch('deleteCartApi', { variationId: id, id: cartId })
          .catch((error: any) => {
            deleteFailed();
            console.log(error);
          })
          .finally(() => {
            disabled.value[id] = 0;
          });
      } else {
        cartStore.dispatch('deleteCartLocal', id).catch((res: any) => {
          deleteFailed();
          console.log(res);
        });
      }
    };

    const deleteFailed = () => {
      alertBulma(
        'warning',
        'Error',
        'No pudimos eliminar el artículo, vuelva a intentarlo.',
        { label: 'Entendido' }
      );
    };

    return { textValues, textProuct, deleteItem, disabled, addCart };
  },
};
