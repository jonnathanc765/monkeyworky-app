<template>
  <div
    v-if="item && !isLoading"
    class="card-product is-align-items-center pt-3"
  >
    <img
      :src="`${$env.url}${item.picture_url}`"
      :alt="item.name"
      width="240px"
      height="240px"
      class="img-product has-text-center cursor-pointer"
      @click="openInfo"
    />
    <span
      class="column is-10 has-text-left ml-2 mt-5 product-name is-uppercase is-size-6 has-text-weight-bold text-monserrat"
      >{{ item.name }}</span
    >
    <div class="column mt-4 is-10 ml-2 has-text-white has-text-left pb-3">
      <span class="p-1 is-size-7 product-description text-monserrat">
        {{ item.sub_category.name }}
      </span>
    </div>
    <button
      v-if="auth.role ? auth.role === 'customer' : true"
      @click="addCart"
      class="button background-black mt-4 has-text-white is-align-self-stretch p-2 btn-shopping-card text-monserrat"
    >
      Añadir al carrito
    </button>
    <div
      v-if="auth ? auth.role === 'admin' : false"
      class="column is-12 is-flex is-justify-content-center is-12-mobile"
    >
      <button
        @click="deleteProduct(item.id)"
        :disabled="disabled"
        class="button button-product-admin background-outside mt-4 has-text-white is-align-self-stretch p-2 mr-4  mb-2 column is-4 is-4-mobile"
      >
        <span class="bi bi-trash is-size-5"></span>
      </button>
      <button
        @click="openEdit"
        class="button button-product-admin background-black mt-4 has-text-white is-align-self-stretch p-2 column mb-2  is-4 is-4-mobile "
      >
        <span class="bi bi-pencil is-size-5"></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
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
</script>
<style lang="scss" src="./card-products.component.scss" />
