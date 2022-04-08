import { ref } from 'vue';
import { computed, SetupContext } from '@vue/runtime-core';
import { categoriesStore } from '@/store/categories';
import alertBulma from '../../../../core/global/alert';
import { errorsApi } from '../../../../core/global/errors';
export default {

    props: ['item'],
    setup(props: { item: any }, context: SetupContext) {

        const form = ref({
            name: props.item.name || '',
            picture: '',
        });

        const disabled = ref(false);

        const categories = computed(() => {
            return categoriesStore.state.categories;
        });

        const dismiss = () => {
            context.emit('dismissForm', true);
        };

        const action = async () => {
            disabled.value = true;
            const formData = new FormData();
            formData.append('name', form.value.name);
            if (form.value.picture !== '') {
                formData.append('picture', form.value.picture);
            }
            await categoriesStore.dispatch(props.item.id ? 'updateCategory' : 'postCategory', props.item.id ? { data: formData, id: props.item.id } : formData ).then((resp) => {
                console.log(resp);
                dismiss();
                alertBulma('danger', props.item.id ? 'Actualización de categoría' : 'Registro de categoría', props.item.id ? 'Se actualizó la categoría satisfactoriamente' : 'Se añadió la categoría satisfactoriamente');
            }).catch((error) => {
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`);
                    return;
                } else if (error.status === 404) {
                    alertBulma('warning', 'Error', `La categoría ingresada no es válida`);
                    return;
                }
                alertBulma('warning', 'Error desconocido', 'Lo sentimos, pero hubo problemas con la comunicación con nuestros servidores.');
            }).finally(() => {
                disabled.value = false;
            });
        };

        const getImage = (event: any) => {
            form.value.picture = event.target.files[0];
        }

        return { form, categories, dismiss, action, disabled, getImage };
    },
};
