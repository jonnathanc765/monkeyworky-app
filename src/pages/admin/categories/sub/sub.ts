import { defineAsyncComponent, ref, onMounted } from 'vue';
import { computed } from '@vue/runtime-core';
import { categoriesStore } from '../../../../store/categories';
import { alertConfirmationBulma } from '../../../../core/global/alert';
import alertBulma from '../../../../core/global/alert';
export default {

    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        Pagination: defineAsyncComponent(() =>
            import('@/components/pagination/pagination.vue'),
        ),
        Form: defineAsyncComponent(() =>
            import('@/pages/admin/categories/sub/form/form.vue'),
        ),
        ButtonAdmin: defineAsyncComponent(() =>
            import('@/components/button-admin/button-admin.vue'),
        ),
    },
    setup() {
        const modal = ref(false);
        const isActive = ref(true);
        const item = ref({});
        const page = ref(0);
        const disabled = ref(false);

        const dismissForm = () => {
            modal.value = false;
        };

        onMounted(async () => {
            await get();
        });

        const get = async () => {
            await categoriesStore.dispatch('getSubCategories', (page.value !== 0) ? { pagination: { page: page.value } } : '').finally(() => {
                isActive.value = false;
            });
        };

        const subCategories = computed(() => {
            return categoriesStore.state.subCategories;
        });

        const pagination = computed(() => {
            return categoriesStore.state.pagination;
        });

        const addSub = () => {
            modal.value = true;
            item.value = {};
        };

        const deleteSub = (row: any) => {
            disabled.value = true;
            alertConfirmationBulma('danger', 'Eliminar sub categoría', `¿Está seguro que desea eliminar la sub categoría ${row.name}?`, async () => {
                await categoriesStore.dispatch('deleteSub', row.sub_category_id).then(() => {
                    alertBulma('danger', 'Sub categoría eliminada', 'Se eliminó la sub categoría satisfactoriamente');
                }).catch(() => {
                    alertBulma('danger', 'Error', 'Hubo un problema a la hora de comunicarse con el servidor');
                }).finally(() => { disabled.value = false; });
            }, () => {
                disabled.value = false;
            });
        };

        const openEdit = (row: any) => {
            item.value = row;
            modal.value = true;
        };

        const actionPagination = async (action: { value: number }) => {
            isActive.value = true;
            page.value = action.value;
            await get();
        };

        return { modal, item, subCategories, isActive, dismissForm, pagination, actionPagination, addSub, disabled, deleteSub, openEdit };
    },
};
