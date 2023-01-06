import { ref } from 'vue';
import { computed, SetupContext } from '@vue/runtime-core';
import { categoriesStore } from '../../../../../store/categories';
import alertBulma from '../../../../../core/global/alert';
import { errorsApi } from '../../../../../core/global/errors';
export default {
  props: ['item'],
  setup(props: { item: any }, context: SetupContext) {
    const form = ref({
      name: props.item.name || '',
      category: props.item.category ? props.item.category.name : '',
    });

    const disabled = ref(false);

    const categories = computed(() => {
      return categoriesStore.state.categories;
    });

    const dismiss = () => {
      context.emit('dismissForm', true);
    };

    const changeCategory = (event: any) => {
      form.value.category = event.target.value;
    };

    const action = async () => {
      disabled.value = true;
      await categoriesStore
        .dispatch(
          props.item.sub_category_id ? 'updateSub' : 'postSub',
          props.item.sub_category_id
            ? { data: form.value, id: props.item.sub_category_id }
            : form.value
        )
        .then(() => {
          if (!props.item.name) {
            form.value.category = '';
            form.value.name = '';
          }
          alertBulma(
            'warning',
            props.item.sub_category_id
              ? 'Actualización de sub categoría'
              : 'Registro de sub categoría',
            props.item.sub_category_id
              ? 'Se actualizó la sub categoría satisfactoriamente'
              : 'Se añadió la sub categoría satisfactoriamente'
          );
        })
        .catch((error) => {
          if (error.status === 422) {
            const errors = errorsApi(error.data.errors);
            alertBulma(
              'warning',
              'Se encontraron los siguientes errores',
              `${errors}`
            );
            return;
          } else if (error.status === 404) {
            alertBulma(
              'warning',
              'Error',
              `La categoría ingresada no es válida`
            );
            return;
          }
          alertBulma(
            'warning',
            'Error desconocido',
            'Lo sentimos, pero hubo problemas con la comunicación con nuestros servidores.'
          );
        })
        .finally(() => {
          disabled.value = false;
        });
    };

    return { form, categories, changeCategory, dismiss, action, disabled };
  },
};
