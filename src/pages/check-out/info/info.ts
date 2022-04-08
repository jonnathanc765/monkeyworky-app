import { deliveryManagementStore } from '@/store/deliveryManagement';
import { ref, onMounted, defineAsyncComponent } from 'vue';
import alertBulma from '../../../core/global/alert';
import { computed } from '@vue/runtime-core';
import { checkOut } from '@/store/checkOut';
export default {

    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
    },

    setup() {
        const changeType = (id: number) => {
            checkOut.commit('setType', id);
        };

        const isActive = ref(true);

        const type = computed(() => {
            return checkOut.state.typeId;
        });

        onMounted(async () => {
            await deliveryManagementStore.dispatch('get').catch(() => {
                alertBulma('danger', 'Error', 'Hubo un problema de comunicación con el servidor para cargar los tipos de entrega, recarga la página');
            }).finally(() => { isActive.value = false; });
        });

        const types = computed(() => {
            return deliveryManagementStore.state.types;
        });

        return { changeType, types, type, isActive };
    },
};
