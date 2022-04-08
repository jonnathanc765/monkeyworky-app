import { defineAsyncComponent, onMounted, ref } from 'vue';
import { bankStore } from '../../../store/bank';
import alertBulma from '../../../core/global/alert';
import { computed } from '@vue/runtime-core';
import { alertConfirmationBulma } from '../../../core/global/alert';
export default {
    components: {
        Form: defineAsyncComponent(() =>
            import('@/pages/admin/banks/form/form.vue'),
        ),
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),

        ButtonAdmin: defineAsyncComponent(() =>
            import('@/components/button-admin/button-admin.vue'),
        ),
    },
    setup() {
        const modal = ref(false);

        const item = ref({});
        const isActive = ref(true);

        const disabled = ref(false);

        onMounted(async () => {
            await bankStore.dispatch('get').catch(() => {
                alertBulma('danger', 'Error', 'No se pudo cargar el listado de bancos, intente nuevamente');
            }).finally(() => { isActive.value = false; });
        });

        const addBank = () => {
            item.value = {};
            modal.value = true;
        };

        const dismissForm = () => {
            modal.value = false;
        };

        const banks = computed(() => {
            return bankStore.state.banks;
        });

        const deleteBank = async (row: any) => {
            disabled.value = true;
            alertConfirmationBulma('warning', 'Eliminar banco', `¿Está seguro que desea eliminar el banco ${row.name}?`, async () => {
                bankStore.dispatch('delete', row.bank_id).catch(() => {
                    alertBulma('warning', 'Error', 'Hubo un problema a la hora de eliminar el banco');
                }).finally(() => { disabled.value = false; });
            }, () => {
                disabled.value = false;
            });
        };

        const openEdit = (row: any) => {
            item.value = row;
            modal.value = true;
        };

        return { addBank, banks, modal, dismissForm, disabled, deleteBank, item, openEdit, isActive };
    },
};
