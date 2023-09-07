<template>
  <div id="modal-address" class="modal modal-products product-info is-active">
    <div class="modal-background"></div>
    <div class="column is-9 is-11-mobile modal-card">
      <header class="modal-card-head background-yellow">
        <p class="modal-card-title has-text-white">
          Información detallada
        </p>
        <button @click="dismiss" class="delete" aria-label="close"></button>
      </header>
      <section id="section-address" class="modal-card-body container-fluid">
        <div class="row">
          <div class="col-md-4">
            <img
              :src="`${$env.url}/images/${item.picture_url}`"
              :alt="item.name"
              width="400px"
              height="400px"
              class="img-product-info"
            />
          </div>
          <div class="col-md-8 info-container">
            <div class="titles">
              <h2>{{ item.name }}</h2>
              <h3>
                <span>
                  {{ item.sub_category.name }} ({{ item.sub_category.category.name }})
                </span>
              </h3>
            </div>
            <div v-if="isCustomer" class="row justify-content-center mt-3">
              <div class="col-md-8 col-lg-6">
                <div class="card">
                  <div class="card-header background-yellow">
                    <p>
                      Seleccionar la cantidad a agregar
                    </p>
                  </div>
                  <div class="card-body">
                    <div
                      v-for="variation in item.variations"
                      :key="variation.id"
                      class="mb-2"
                    >
                      <div class="h-centered">
                        <label :for="`input-${variation.id}`">
                          {{ variation.price }}$ | {{ variation.size }}
                        </label>
                      </div>
                      <input
                        @input="addValue(variation)"
                        v-model="quantity[variation.id]"
                        :id="`input-${variation.id}`"
                        type="number"
                        min="0"
                        class="form-control"
                      />
                    </div>
                    <div class="h-centered">
                      <button class="custom-btn" @click="addCart">
                        AÑADIR AL CARRITO
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { cartStore } from '@/store/cart';
import { ref, computed, SetupContext } from '@vue/runtime-core';
import {
  removeClassValidation,
  addClassValidation,
} from '../../core/global/validation';
import alertBulma from '../../core/global/alert';
import { alertConfirmationBulma } from '../../core/global/alert';

export default {
  props: ['item'],
  setup(props: any, context: SetupContext) {
    const dismiss = () => {
      context.emit('dismiss');
    };
    const disabled = ref(false);
    const quantity = ref([]);
    const authStore = useStore();
    const router = useRouter();

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

    const auth = computed(() => {
      return authStore.state.auth;
    });

    const isCustomer = computed(() => {
      return authStore.getters.isCustomer;
    })

    return { addValue, addCart, isCustomer, dismiss, auth, quantity };
  },
};
</script>
<style lang="scss">
.modal-product-info {
  background: white;
  width: 30rem !important;
  height: 450px;
}

.product-info {
  .row {
    margin: 0;
  }
  section {
    max-height: 85% !important;
    overflow-y: auto !important;
  }
  .card {
    .modal-card-body {
      background-color: red;
    }
  }
}

.img-product-info {
  display: block !important;
  width: 100% !important;
  height: 450px !important;
  object-fit: contain !important;
}
.info-container {
  .titles {
    margin-bottom: 30px;
    h2 {
      font-size: 26px;
      margin-bottom: 10px;
      font-weight: 800;
      text-align: end;
      text-transform: uppercase;
    }
    h3 {
      text-align: end;
      font-size: 18px;
      span {
        padding: 5px;
        border-radius: 8px;
        background: $color_yellow;
      }
    }
    @media screen and (max-width: 767px) {
      h3, h2 {
        text-align: center;
      }
    }
  }
  .card {
    border: none;
    .card-header {
      p {
        font-size: 22px;
        text-align: center;
        width: 100%;
      }
    }
    .card-body {
      input {
        max-width: 80px;
      }
    }
  }
}
</style>
