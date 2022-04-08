import { computed, ref, onMounted, defineAsyncComponent } from 'vue';
import { cartStore } from '../../store/cart';
import alertBulma from '../../core/global/alert';
import { checkOut } from '@/store/checkOut';
import { useRouter } from 'vue-router';
import { utilitiesStore } from '../../store/utilities';
import { errorsApi } from '../../core/global/errors';
import { validateEmail } from '../../core/global/validation';

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
            if (num > 5) {
                if (checkEmptyPayment()) {
                    if (checkOut.state.registerPay.image !== '') {
                        if (validateEmail(checkOut.state.registerPay.email)) {
                            if (checkOut.state.registerPay.name.length > 5) {
                                await send();
                                return;
                            }
                            alertBulma('warning', 'Campo incorrecto (Item 5)', 'El nombre del titular de la cuenta debe tener como mínimo 6 caracteres');
                            return;
                        }
                        alertBulma('warning', 'Campo incorrecto (Item 5)', 'Debe ingresar un correo válido.');
                        return;
                    }
                    alertBulma('warning', 'Campo vacío (Item 5)', 'Debe subir el comprobante de pago');
                    return;
                }
                checkOut.commit('setTruncate', true);
                alertBulma('warning', 'Campos vacíos (Item 5)', 'Debe rellenar todos los datos requeridos');
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
                    pay(res.id);
                } else {
                    loader.value = false;
                    router.push(`/order/${res.id}`);
                }
            }).catch((error) => {
                console.log(error);
                loader.value = false;
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('danger', 'Se encontraron los siguientes errores', `${errors}`);
                    return;
                } else if (error.status === 403) {
                    alertBulma('danger', 'Dirección no encontrada', `La dirección suministrada no fue añadida, vuelva al paso 3 y presione en "Añadir nueva dirección"`);
                    return;
                } else if (error.status === 406) {
                    alertBulma('danger', 'Perfil no completado', `Para poder realizar una orden primero debe rellenar todos los datos en el perfil`);
                    return;
                }
                alertBulma('danger', 'Error', 'Hubo un problema a la hora de procesar su orden, por favor vuelva a intentarlo');
            });
        };

        const pay = async (id: number) => {
            await checkOut.dispatch('payApi', id).then((res) => {
                loader.value = false;
                router.push(`/order/${id}`);
            }).catch(() => {
                loader.value = false;
                alertBulma('danger', 'Error', 'La orden fue generada satisfactoriamente, pero hubo un problema con el registro del pago, por favor registre el pago nuevamente.', { label: 'Entendido' });
                router.push(`/register/payment`);
            });
        };

        return { products, btnActive, changeActive, text, loader };
    },
};
