
import alertBulma from '../../../core/global/alert';
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { SignIn } from '../../../core/interfaces/Auth.interface';
import { useRouter } from 'vue-router';
import { cartStore } from '../../../store/cart';
import { computed } from '@vue/runtime-core';
import { alertBulmaInputEmpty } from '../../../core/global/alert';
import { addClassValidation, removeClassValidation } from '../../../core/global/validation';
import { useStore } from 'vuex';
export default {
    name: 'SignInComponent',
    components: {
        Background: defineAsyncComponent(() =>
            import('@/components/background/background.component.vue'),
        ),
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        InputForm: defineAsyncComponent(() =>
            import('@/components/input-form/input-form.component.vue'),
        ),
    },
    setup() {
        const form = ref({
            email: '',
            password: '',
        } as SignIn);

        const authStore = useStore();

        const iconEyePass = ref('fas fa-eye color-red cursor-pointer z-index');

        const spinner = ref(false);

        const router = useRouter();

        onMounted(() => {
            cartStore.dispatch('getCartLocal');
        });

        const productsLocal = computed(() => {
            return cartStore.state.products;
        });

        const registerProducts = () => {
            if (productsLocal.value.length > 0) {
                cartStore.dispatch('addCartAuth').catch((error) => {
                    console.log(error);
                    alertBulma('danger', 'Error', 'No pudimos registrar algunis items del carrito de compra en la base de datos, la comunicación falló');
                }).finally(() => {
                    localStorage.removeItem('_shoppingCart');
                });
            }
        };

        const signIn = async () => {
            if (form.value.email.trim() === '' || form.value.password.trim() === '') {
                alertBulmaInputEmpty();
                return;
            }

            spinner.value = true;

            await authStore.dispatch('signIn', form.value).then(() => {
                registerProducts();
                spinner.value = false;
                router.push('/home');
            }).catch((error: any) => {
                console.log(error);
                spinner.value = false;
                if (error.status === 422) {
                    alertBulma('warning', 'Inicio de sesión fallido', 'Las credenciales ingresadas son incorrectas', { label: 'Entendido' });
                    return;
                }
                alertBulma('warning', 'Error fatal', 'Tuvimos problemas con el servidor, por favor intenta en un momento.', { label: 'Entendido' });
            });
        };

        const getValue = (value: any) => {
            form.value.password = value.value;
        };

        const changeFocus = (event: any) => {
            if (event.type === 'click') {
                const id = event.srcElement.id;
                if (id === 'password') {
                    addClassValidation('#focus-line', ['w-100']);
                    return;
                }
                removeClassValidation('#focus-line', ['w-100']);
            }
        };
        return { signIn, form, spinner, iconEyePass, changeFocus, getValue };
    },
};
