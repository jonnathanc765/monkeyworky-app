import {
  removeClassValidation,
  addClassValidation,
} from '../../core/global/validation';
import { ref } from 'vue';
import alertBulma from '../../core/global/alert';
import { cartStore } from '@/store/cart';
import { alertConfirmationBulma } from '../../core/global/alert';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { SetupContext } from '@vue/runtime-core';

export default {
  props: ['item'],
  setup(props: any, context: SetupContext) {
    const quantity = ref([]);
    const router = useRouter();
    const authStore = useStore();
    const disabled = ref(false);
    let array_variation: {
      id: number;
      quantity: number;
      size: string;
      price: string;
    }[] = [];
    const variation = ref({
      id: 0,
      quantity: 0,
      size: '',
      price: '',
    });

    const dismiss = () => {
      removeClassValidation('#modal-products', ['is-active']);
    };

    const addValue = (row: any) => {
      variation.value = {
        ...row,
        quantity: Number(quantity.value[row.id]),
      };
      array_variation.map((variation, index) => {
        if (variation.id === row.id) {
          array_variation.splice(index, 1);
        }
      });
      array_variation.push(variation.value);
      console.log(array_variation);
    };

    const addCart = () => {
      let resp: boolean = false;
      if (array_variation.length > 0) {
        disabled.value = true;
        addClassValidation(`#addCartProduct`, ['is-loading']);
        array_variation.map(async (variation: any) => {
          if (variation.quantity > 0) {
            const data = [
              {
                product_id: props.item.id,
                quantity: variation.quantity,
                variation_id: variation.id,
                product: {
                  name: props.item.name,
                  picture_url: props.item.picture_url,
                },
                variation: variation,
              },
            ];
            if (authStore.state.auth.id) {
              cartStore
                .dispatch('addCart', {
                  quantity: variation.quantity,
                  variation_id: variation.id,
                })
                .then((res: any) => {
                  if (!resp) {
                    resp = true;
                    alertSuccesfull();
                  }
                })
                .catch((error: any) => {
                  if (!resp) {
                    resp = true;
                    alertBulma(
                      'warning',
                      'Error',
                      'Ocurrió un error inesperado a la hora de guardar el producto en el carrito, intenta nuevamente',
                      { label: 'Entendido' }
                    );
                  }
                })
                .finally(() => {
                  disabled.value = false;
                  removeClassValidation(`#addCartProduct`, ['is-loading']);
                });
            } else {
              cartStore
                .dispatch('addCartLocal', data)
                .then((res: any) => {
                  if (!resp) {
                    resp = true;
                    alertSuccesfull();
                  }
                })
                .catch((error: any) => {
                  if (!resp) {
                    resp = true;
                    alertBulma(
                      'warning',
                      'Error',
                      'Ocurrió un error inesperado a la hora de guardar el producto en el carrito, intenta nuevamente',
                      { label: 'Entendido' }
                    );
                  }
                })
                .finally(() => {
                  disabled.value = false;
                  removeClassValidation(`#addCartProduct`, ['is-loading']);
                });
            }
          } else {
            alertBulma(
              'warning',
              'Error',
              variation.value.id !== 0 && props.item.variations.length > 1
                ? `Tu última modificación fue a la variación ${variation.value.size}, por ende, debe ser mayor a 0. Si desea ingresar otra variación modifca la que desea agregar.`
                : 'La cantidad no puede ser 0.',
              { label: 'Entendido' }
            );
          }
        });
      }
    };

    const alertSuccesfull = () => {
      alertConfirmationBulma(
        'warning',
        'Carrito de compras',
        'Se agregó satisfactoriamente el producto al carrito ¿Deseas seguir agregando productos?',
        () => {
          dismiss();
          context.emit('addQuantity', true);
          router.push('/shopping-cart');
        },
        () => {
          dismiss();
        },
        'Ir al carrito de compras',
        'Seguir mirando productos'
      );
    };

    return { dismiss, addCart, addValue, quantity, disabled };
  },
};
