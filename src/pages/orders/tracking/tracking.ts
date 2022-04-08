import { orderStore } from '../../../store/order';
import { ref } from 'vue';
import { addClassValidation, removeClassValidation } from '../../../core/global/validation';
import alertBulma from '../../../core/global/alert';
import { useRouter } from 'vue-router';
import { defineAsyncComponent, computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {

    components: {
        Modal: defineAsyncComponent(() =>
            import('@/pages/orders/tracking/modal/modal.vue'),
        ),
    },
    setup() {
        const disabled = ref(false);
        const router = useRouter();
        const isModal = ref(false);
        const orderId = ref(null);
        const authStore = useStore();
        const searchOrder = async () => {
            disabled.value = true;
            addClassValidation('#tracking-btn', ['is-loading']);
            await orderStore.dispatch('tracking', orderId.value).then(() => {
                router.push(`/tracking/${orderId.value}`);
            }).catch((error) => {
                if (error.status === 404) {
                    alertBulma('warning', 'Rastrear mi pedido', 'No se encontró el número de orden ingresado');
                    return;
                }
                alertBulma('warning', 'Rastrear mi pedido', 'Hubo un problema con el servidor a la hora de buscar la orden');
            }).finally(() => {
                disabled.value = false;
                removeClassValidation('#tracking-btn', ['is-loading']);
            });
        };

        const auth = computed(() => {
            return authStore.state.auth;
        });

        return { searchOrder, disabled, orderId, isModal, auth };
    },
};
