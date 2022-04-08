import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref, computed, defineAsyncComponent } from 'vue';
import { orderStore } from '../../../store/order';
import alertBulma from '../../../core/global/alert';
import { textDetails, textInfo } from '../../../core/global/statusOrder';
import { useStore } from 'vuex';
export default {
    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        Products: defineAsyncComponent(() =>
            import('@/pages/check-out/products/products.vue'),
        ),
        Modal: defineAsyncComponent(() =>
            import('@/pages/orders/details/modal/modal.vue'),
        ),
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const isActive = ref(true);
        const authStore = useStore();
        const modal = ref(false);
        const item = ref({});

        const auth = computed(() => {
            return authStore.state.auth;
        });

        onMounted(async () => {
            await orderStore.dispatch('details', route.params.id).catch((error) => {
                if (error.status === 404) {
                    router.push('/my/sales');
                }
                alertBulma('danger', 'Error', 'No se pudo cargar el detalle de la orden, por favor actualiza la página', { label: 'Entendido' });
            }).finally(() => {
                isActive.value = false;
            });
        });

        const details = computed(() => {
            return orderStore.state.details;
        });

        const openChange = (row: any) => {
            modal.value = true;
            item.value = row;
        };

        const text = (status: string) => {
            return textDetails(status);
        };

        const returnData = (row: any, name: string) => {
            return textInfo(row, name);
        };

        const content = ref([
            {
                name: 'Estado',
            },
            {
                name: 'Monto',
            },
            {
                name: 'Banco de origen',
            },
            {
                name: 'Banco de destino',
            },
            {
                name: 'Titular de la cuenta',
            },
            {
                name: 'Email de la cuenta',
            },
            {
                name: 'Fecha de la transacción',
            },
            {
                name: 'Número de referencia',
            },
            {
                name: 'Método de pago',
            },
            {
                name: 'Comprobante de pago',
            },
        ]);

        const address = ref([
            {
                name: 'Estado ',
            },
            {
                name: 'Municipio',
            },
            {
                name: 'Parroquia',
            },
            {
                name: 'Dirección',
            },
            {
                name: 'Indicaciones de dirección',
            },
            {
                name: 'Tipo/número de habitación',
            },
            {
                name: 'Nombre de dirección',
            },
        ]);

        const returnName = (value: string) => {
            return value;
        };

        const dismissForm = () => {
            modal.value = false;
        };

        return { details, content, returnData, address, returnName, text, isActive, auth, modal, item, openChange, dismissForm, route };
    },
};
