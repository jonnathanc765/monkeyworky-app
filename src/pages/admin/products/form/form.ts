import { removeClassValidation, addClassValidation } from '../../../../core/global/validation';
import { ref, onMounted, onUnmounted } from 'vue';
import alertBulma from '../../../../core/global/alert';
import { computed, SetupContext } from '@vue/runtime-core';
import { variationStore } from '@/store/variation';
import { productStore } from '../../../../store/product';
import { errorsApi } from '../../../../core/global/errors';
export default {

    props: ['categories', 'item'],
    setup(props: { categories: any, item: any }, context: SetupContext) {

        const subCategories = ref([] as any);

        const variations = computed(() => {
            return variationStore.state.variations;
        });

        const reset = ref(true);
        const disabled = ref(false);

        const form = ref({
            name: props.item.name || '',
            sub_category: (props.item.sub_category) ? props.item.sub_category.sub_category_id : '',
            picture: '',
            variations: props.item.variations || [{
                size_id: '',
                price: '',
            }],
        });


        /* FUNCTIONS */

        onMounted(() => {
            console.log(form.value);
            if (props.item.sub_category) {
                changeCategory({ target: { value: props.item.sub_category.category.id } });
            }
            variationStore.dispatch('get');
        });

        const dismiss = () => {
            context.emit('dismissForm', true);
        };

        const changeCategory = (event: any) => {
            reset.value = false;
            if (event.target.value !== 'Seleccione') {
                const category = props.categories.find((res: any) => res.id === Number(event.target.value));
                if (category) {
                    subCategories.value = category.subcategories;
                    form.value.sub_category = category.subcategories[0].id;
                    return;
                }
            }
            subCategories.value = [];
        };

        const changeSubCategory = (event: any) => {
            form.value.sub_category = event.target.value;
        };

        const changeVariation = (event: any, index: number) => {
            reset.value = false;
            form.value.variations[index].size_id = event.target.value;
        };

        const addProduct = () => {
            disabled.value = true;
            addClassValidation(`#addProduct`, ['is-loading']);
            const formData = new FormData();
            formData.append('name', form.value.name);
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < form.value.variations.length; index++) {
                formData.append(`variations[${index}][size_id]`, form.value.variations[index].size_id);
                formData.append(`variations[${index}][price]`, form.value.variations[index].price);
            }
            formData.append('sub_category', form.value.sub_category);
            if (form.value.picture !== '') {
                formData.append('picture', form.value.picture);
            }
            productStore.dispatch((props.item.name ? 'put' : 'addProduct'), props.item.name ? { data: formData, id: props.item.id } : formData).then((res) => {
                disabled.value = false;
                removeClassValidation(`#addProduct`, ['is-loading']);
                alertBulma('warning', props.item.name ? 'Actualización de producto' : 'Registro de producto', props.item.name ? 'El producto se actualizó satisfactoriamente.' : 'El producto se agregó satisfactoriamente');
                if (!props.item.name) {
                    resetAll();
                }
            }).catch((error) => {
                disabled.value = false;
                removeClassValidation(`#addProduct`, ['is-loading']);
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`);
                    return;
                }
                alertBulma('warning', 'Error desconocido', 'Lo sentimos, pero hubo problemas con la comunicación con nuestros servidores.', { label: 'Entendido' });
            });
        };

        const resetAll = () => {
            form.value.name = '';
            reset.value = true;
            form.value.picture = '';
            form.value.sub_category = '';
            form.value.variations = [{
                size_id: '',
                price: '',
            }];
        };

        const getImage = (event: any) => {
            form.value.picture = event.target.files[0];
        };

        const deleteVariation = (index: number) => {
            if (form.value.variations.length > 1) {
                form.value.variations = form.value.variations.filter((res: any, i: number) => i !== index);
            }
        };

        const addVariation = () => {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < form.value.variations.length; i++) {
                console.log(form.value.variations[i]);
                if (form.value.variations[i].price === '' || form.value.variations[i].size_id === '') {
                    alertBulma('danger', 'Variaciones vacías', 'Debe rellenar todas las variaciones antes de agregar una nueva');
                    return;
                }
            }

            form.value.variations.push({ size_id: '', price: '' });

        };

        return { dismiss, subCategories, changeCategory, disabled, changeVariation, changeSubCategory, form, addProduct, addVariation, variations, deleteVariation, getImage, reset };
    },
};
