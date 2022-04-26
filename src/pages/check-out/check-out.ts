import { computed, ref, onMounted, defineAsyncComponent } from 'vue';
import { cartStore } from '../../store/cart';
import alertBulma from '../../core/global/alert';
import { checkOut } from '@/store/checkOut';
import { useRouter } from 'vue-router';
import { utilitiesStore } from '../../store/utilities';
import { errorsApi } from '../../core/global/errors';
import { validateEmail } from '../../core/global/validation';
import { alertConfirmationBulma } from '../../core/global/alert';

export default {

    components: {
        Products: defineAsyncComponent(() =>
            import('./products/products.vue'),
        ),
        Info: defineAsyncComponent(() =>
            import('./info/info.vue'),
        ),
        Address: defineAsyncComponent(() =>
            import('./address/address.vue'),
        ),
        Pays: defineAsyncComponent(() =>
            import('./pays/pays.vue'),
        ),
        RegisterPay: defineAsyncComponent(() =>
            import('./register-pay/register-pay.vue'),
        ),
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
    },

    setup() {

        const router = useRouter();
        const loader = ref(true);
        const text = ref('Cargando productos.');
        const registerPay = ref({
            bankOrigin: '' as any,
            bankSend: '' as any,
            reference: '',
            date: '',
            email: '',
            name: '',
            amount: 0,
            image: '',
        });

        const btnActive = ref(1);
        const typeId = computed(() => {
            return checkOut.state.typeId;
        });

        onMounted(async () => {
            checkOut.commit('setType', 0);
            checkOut.commit('setAddressId', 0);
            checkOut.commit('setRegisterPay', registerPay.value);
            checkOut.commit('setTruncate', false);

            await cartStore.dispatch('getCartApi').then(() => {
                loader.value = false;
                registerPay.value.amount = cartStore.state.total;
                checkOut.commit('setRegisterPay', registerPay.value);
            }).catch((error: any) => {
                loader.value = false;
                console.log(error);
                alertBulma('warning', 'Error', 'No pudimos cargar la lista de artículos del carrito, por favor recarga la página', { label: 'Entendido' });
            });
            cartStore.dispatch('values');
        });

        const products = computed(() => {
            return cartStore.state.products;
        });

        const changeActive = async (num: number) => {
            if (num > 2) {
                if (checkOut.state.typeId === 0) {
                    alertBulma('warning', 'Campo no seleccionado (Item 2)', 'Debe seleccionar el tipo de entrega');
                    return;
                }
            }
            if (num > 3 && typeId.value === 1) {
                if (checkOut.state.addressId === 0) {
                    alertBulma('warning', 'Campo no seleccionado (Item 3)', 'Debe seleccionar una dirección');
                    return;
                }
            } else if (num === 3) {
                if (typeId.value !== 1) {
                    btnActive.value = num + 1;
                    return;
                }
            }
            if (num > 4) {
                await send();
                return;
            }
            btnActive.value = num;
        };

        const checkEmptyPayment = () => {
            if (checkOut.state.registerPay.bankOrigin !== '' && checkOut.state.registerPay.email !== '' && checkOut.state.registerPay.name !== '' && checkOut.state.registerPay.date !== '' && checkOut.state.registerPay.bankDestination) {
                return true;
            }
            return false;
        };

        const send = async () => {
            text.value = 'Espere mientras comprobamos la información';
            loader.value = true;
            await checkOut.dispatch('checkOutApi').then((res) => {
                if (checkEmptyPayment()) {
                    pay(res.order.id);
                } else {
                    loader.value = false;
                    router.push(`/order/${res.order.id}`);
                }
                const generar = generateWhatsappText(res);
                alertConfirmationBulma('warning', 'Redirigiendo a Whatsappp', 'Se agregó satisfactoriamente el pedido, deseas enviar el pedido a Whatsapp?', () => {
                    window.location.replace("https://api.whatsapp.com/send/?phone=%2B584149549050&text="+generar)
                }, () => {
                }, 'Enviar mi pedido a Whatsapp', 'Salir');

            }).catch((error) => {
                console.log(error);
                loader.value = false;
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`);
                    return;
                } else if (error.status === 403) {
                    alertBulma('warning', 'Dirección no encontrada', `La dirección suministrada no fue añadida, vuelva al paso 3 y presione en "Añadir nueva dirección"`);
                    return;
                } else if (error.status === 406) {
                    alertBulma('warning', 'Perfil no completado', `Para poder realizar una orden primero debe rellenar todos los datos en el perfil`);
                    return;
                }
                alertBulma('warning', 'Error', 'Hubo un problema a la hora de procesar su orden, por favor vuelva a intentarlo');
            });
        };

        const pay = async (id: number) => {
            await checkOut.dispatch('payApi', id).then((res) => {
                loader.value = false;
                router.push(`/order/${id}`);
            }).catch(() => {
                loader.value = false;
                alertBulma('warning', 'Error', 'La orden fue generada satisfactoriamente, pero hubo un problema con el registro del pago, por favor registre el pago nuevamente.', { label: 'Entendido' });
                router.push(`/register/payment`);
            });
        };

        const generateWhatsappText = (req: any) => {
            const data = req;
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

        return { products, btnActive, changeActive, text, loader };
    },


};
