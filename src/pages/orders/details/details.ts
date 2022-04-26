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

        const sendWhatsapp = () => {
            const text = generateWhatsappText();
            window.location.replace("https://api.whatsapp.com/send/?phone=%2B584149549050&text="+text)
        };

        const generateWhatsappText = () => {
            const data = details.value;
            console.log(data);
            let text = null;
            if(data){
                text = `%2A+-----+%2ADetalle+del+Pedido+Nro.+${data.order.id}%2A+-----+%2A+%0A`;
                if(data.products){
                    for(let product of data.products){
                        text = text+`%0A%2A${product.quantity}+x+${product.product.name}%2A+$${product.variation.price}.00+Cada+Uno/a`;
                    }
                    text = text+`%0A%0ATotal:+%2A$${data.order.total}.00%2A%0A`
                }
                text = text+`%0A%2A+-----+%2AInformación+del+cliente%2A+-----+%2A+%0A`;
                if(data.order){
                    text = text+`%0AMetodo+de+entrega:+%2A${data.order.type}%2A`;
                    text = text+`%0ACliente:+%2A${data.address.user.people.firstname}+${data.address.user.people.lastname}%2A`;
                    text = text+`%0AEmail:+%2A${data.address.user.email}%2A`;
                    text = text+`%0ADirección+de+entega:+%2A${data.address.address}%2A`;
                    text = text+`%0AEstado:+%2A${data.address.parish.state.name}%2A`;
                    text = text+`%0AParroquia:+%2A${data.address.parish.name}%2A`;
                    text = text+`%0AMunicipio:+%2A${data.address.parish.municipality.name}%2A`;           
                }
            }
            return text;
        }

        return { details, content, returnData, address, returnName, text, isActive, auth, modal, item, openChange, dismissForm, route, generateWhatsappText, sendWhatsapp};
    },
};
