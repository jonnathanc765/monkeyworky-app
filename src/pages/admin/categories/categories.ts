import { computed } from '@vue/runtime-core';
import { categoriesStore } from '../../../store/categories';
import { ref, defineAsyncComponent } from 'vue';
import { alertConfirmationBulma } from '../../../core/global/alert';
import alertBulma from '../../../core/global/alert';
export default {

    components: {
        Form: defineAsyncComponent(() =>
            import('@/pages/admin/categories/form/form.vue'),
        ),
        ButtonAdmin: defineAsyncComponent(() =>
            import('@/components/button-admin/button-admin.vue'),
        ),
    },
    setup() {
        const modal = ref(false);
        const item = ref({});
        const disabled = ref(false);

        const categories = computed(() => {
            return categoriesStore.state.categories;
        });

        const add = () => {
            item.value = {};
            modal.value = true;
        };

        const deleteCategory = (row: any) => {
            disabled.value = true;
            alertConfirmationBulma('warning', 'Eliminar categoría', `¿Está seguro que desea eliminar la categoría ${row.name}?`, async () => {
                await categoriesStore.dispatch('deleteCategory', row.id).then(() => {
                    alertBulma('warning', 'Categoría eliminada', 'Se eliminó la categoría satisfactoriamente');
                }).catch(() => {
                    alertBulma('warning', 'Error', 'Hubo un problema a la hora de comunicarse con el servidor');
                }).finally(() => { disabled.value = false; });
            }, () => {
                disabled.value = false;
            });
        };

        const openEdit = (row: any) => {
            item.value = row;
            modal.value = true;
        };

        const dismissForm = () => {
            modal.value = false;
        };

        return { categories, disabled, deleteCategory, modal, item, add, dismissForm, openEdit };
    },
};
