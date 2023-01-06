import { defineComponent, ref } from 'vue';
import { enviroment } from '../../core/env/enviroment';
import { Data } from '../../core/interfaces/Data.interface';
import { SetupContext, computed } from '@vue/runtime-core';
import { addClassValidation } from '../../core/global/validation';
import { useStore } from 'vuex';
import { productStore } from '@/store/product';
import alertBulma from '../../core/global/alert';
import { useRoute, useRouter } from 'vue-router';
import { alertConfirmationBulma } from '../../core/global/alert';

export default defineComponent({
  name: 'CardProductsComponent',
  props: ['item', 'isLoading'],
  setup(props: Data, context: SetupContext) {
    const URL = enviroment.URL;
    const authStore = useStore();
    const route = useRoute();
    const router = useRouter();

    const addCart = () => {
      context.emit('getItem', props.item);
      addClassValidation('#modal-products', ['is-active']);
    };

    const disabled = ref(false);

    const deleteProduct = async (id: number) => {
      if (auth.value.role) {
        if (auth.value.role === 'admin') {
          disabled.value = true;
          alertConfirmationBulma(
            'warning',
            'Eliminar producto',
            '¿Está seguro que desea eliminar este producto?',
            async () => {
              await apiDelete(id);
            },
            () => {
              disabled.value = false;
            }
          );
        }
      }
    };

    const apiDelete = async (id: number) => {
      await productStore
        .dispatch('delete', id)
        .then(() => {
          alertBulma(
            'warning',
            'Producto eliminado',
            'El producto fue eliminado satisfactoriamente'
          );
        })
        .catch(() => {
          alertBulma(
            'warning',
            'Error',
            'Hubo un problema a la hora de eliminar el producto, intente nuevamente'
          );
        })
        .finally(() => {
          disabled.value = false;
        });
    };

    const openInfo = () => {
      context.emit('openInfo', props.item);
    };

    const openEdit = () => {
      if (route.name === 'home') {
        router.push('/products');
      }
      context.emit('editProduct', props.item);
    };

    const auth = computed(() => {
      return authStore.state.auth;
    });
    return { URL, addCart, auth, deleteProduct, disabled, openEdit, openInfo };
  },
});
