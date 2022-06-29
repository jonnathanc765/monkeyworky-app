import alertBulma from '@/core/global/alert';
import { addClassValidation, removeClassValidation } from '@/core/global/validation';
import { ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { errorsApi } from '../../../core/global/errors';
import { cartStore } from '../../../store/cart';
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { addressStore } from '../../../store/address';

export default {
    name: 'SignUpComponent',
    emits: ['valueInput'],
    components: {
        Background: defineAsyncComponent(() =>
            import('@/components/background/background.component.vue'),
        ),
        InputForm: defineAsyncComponent(() =>
            import('@/components/input-form/input-form.component.vue'),
        ),
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
    },
    props: {
    },

    setup() {
        const form = ref({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            password_confirmation: '',
            state: 13,
        }) as any;
        const authStore = useStore();
        const textPassword = ref('');
        const border = ref(false);
        const iconEyePass = ref('fas fa-eye color-red cursor-pointer z-index');
        const router = useRouter();
        const spinner = ref(false);
        const borderDni = (event: any) => {
            if (event.type === 'click') {
                const id = event.srcElement.id;
                if (id === 'dni' || id === 'typeDni') {
                    border.value = true;
                    return;
                }
            }
            border.value = false;
        };

        onMounted(() => {
            cartStore.dispatch('getCartLocal');
            addressStore.dispatch('getStates').catch(() => {
                alertBulma('warning', 'Error', 'Error a la hora de cargar los estados');
            });
        });

        const states = computed(() => {
            return addressStore.state.states;
        });

        const validateKey = (key: string) => {
            if (key === 'password_confirmation') {
                textPassword.value = form.value.password !== form.value.password_confirmation ? '<br> Las contraseñas no coinciden' : '';
            }
        };

        const productsLocal = computed(() => {
            return cartStore.state.products;
        });

        const registerProducts = () => {
            if (productsLocal.value.length > 0) {
                cartStore.dispatch('addCartAuth').catch((error) => {
                    console.log(error);
                    alertBulma('warning', 'Error', 'No pudimos registrar algunis items del carrito de compra en la base de datos, la comunicación falló');
                }).finally(() => {
                    localStorage.removeItem('_shoppingCart');
                });
            }
        };

        const validation = async () => {
            spinner.value = true;
            const ids = [];
            for (const key in form.value) {
                if (Object.prototype.hasOwnProperty.call(form.value, key)) {
                    if (form.value[key] === '') {
                        addClass(key);
                        ids.push(key);
                    }
                }
            }

            if (textPassword.value !== '') {
                spinner.value = false;
                alertBulma('warning', 'Campos no válidos', `${textPassword.value}`);
                return;
            }
            await signUp();

        };

        const signUp = async () => {
            await authStore.dispatch('signUp', form.value).then(async () => {
                await signIn();
            }).catch((error) => {
                spinner.value = false;
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`, { label: 'Entendido' });
                    return;
                }
                alertBulma('warning', 'Error desconocido', 'Lo sentimos, pero hubo problemas con la comunicación con nuestros servidores.', { label: 'Entendido' });
            });
        };

        const signIn = async () => {
            await authStore.dispatch('signIn', form.value).then((res) => {
                registerProducts();
                console.log(productsLocal.value.lengtj);
                if(productsLocal.value.length > 0){
                    router.push('/shopping-cart');
                } else {
                    router.push('/home');
                }
                spinner.value = false;
                alertBulma('warning', 'Registro exítoso', 'Se ha completado el registro satisfactoriamente, serás llevado a la página principal en breve');
            }).catch((error) => {
                spinner.value = false;
                alertBulma('warning', 'Error al iniciar sesión', 'El registro fue exitoso, pero tuvimos problemas para iniciar sesión, debes iniciar sesión manualmente');
                router.push('/auth/sign-in');
            });
        };

        const borderDniValue = (value: boolean) => {
            value ? addClassValidation('#div-dni', ['border-dni2']) : removeClassValidation('#div-dni', ['border-dni2']);
        };

        const addClass = (key: string) => {
            if (key === 'password' || key === 'password_confirmation') {
                removeClassValidation(`#icon-${key}`, ['fa-eye']);
                addClassValidation(`#${key}`, ['is-danger']);
                addClassValidation(`#icon-${key}`, ['fas', 'fa-times', 'color-red']);

            } else {
                const condition = key === 'dni' || key === 'typeDni';
                addClassValidation(condition ? '#div-dni' : `#${key}`, condition ? ['border-dni'] : ['is-danger', 'has-icons-right']);
                addClassValidation(`#icon-${key}`, ['fas', 'fa-times', 'color-red']);

            }
        };

        const select = (event: any) => {
            form.value.state = event.target.value;
        };

        const getValue = (data: any) => {
            form.value[data.key] = data.value;
            if (form.value[data.key].trim() === '') {
                addClass(data.key);

            } else {
                if (data.key === 'password' || data.key === 'password_confirmation') {
                    removeClassValidation(`#icon-${data.key}`, ['fa-times', 'is-danger']);
                    removeClassValidation(`#${data.key}`, ['is-danger']);
                    addClassValidation(`#icon-${data.key}`, ['fas', 'fa-eye', 'color-red']);

                } else {
                    const condition = data.key === 'dni' || data.key === 'typeDni';
                    removeClassValidation(condition ? '#div-dni' : `#${data.key}`, condition ? ['border-dni'] : ['is-danger', 'has-icons-right']);
                    removeClassValidation(`#icon-${data.key}`, ['fas', 'fa-times', 'color-red']);

                }
            }
        };

        return { form, border, spinner, borderDni, select, validation, getValue, borderDniValue, validateKey, iconEyePass, states };
    },
};
