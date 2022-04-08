import { defineAsyncComponent, ref, onMounted } from 'vue';
import alertBulma from '../../../core/global/alert';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
export default {
    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        Background: defineAsyncComponent(() =>
            import('@/components/background/background.component.vue'),
        ),
    },
    setup() {

        const spinner = ref(false);
        const authStore = useStore();
        const route = useRoute();
        const router = useRouter();
        const change = ref(false);

        const form = ref({
            email: '' as any,
            password: '',
            password_confirmation: '',
            token: '' as any,
        });

        onMounted(() => {
            if (route.query.token && route.query.email) {
                change.value = true;
                form.value.token = route.query.token;
                form.value.email = route.query.email;
            }
        });

        const action = async () => {
            spinner.value = true;
            if (change.value) {
                await authStore.dispatch('forgotPassword', form.value).then(() => {
                    alertBulma('warning', 'Contraseña restablecida', 'Se cambió la contraseña satisfactoriamente');
                    router.push('/auth/sign-in');
                }).catch((error) => {
                    if (error.status === 401) {
                        alertBulma('warning', 'Error', 'El token ha expirado, solicite un nuevo restablecimiento de contraseña');
                        return;
                    }
                    alertBulma('warning', 'Error', 'Hubo un problema en la comunicación de los servidores');
                }).finally(() => {
                    spinner.value = false;
                });
            } else {
                await authStore.dispatch('emailPassword', form.value.email).then(() => {
                    alertBulma('warning', 'Enviado satisfactoriamente', 'Su correo se ha puesto en una cola de envío, en caso de no encontrar el correo en su bandeja de entrada, verifique en la de spam. Ya puedes cerrar esta pestaña');
                }).catch((error) => {
                    if (error.status === 404) {
                        alertBulma('warning', 'Error', 'No se encontró en la base de datos el correo ingresado');
                        return;
                    }
                    alertBulma('warning', 'Error', 'Hubo un problema en la comunicación de los servidores');
                }).finally(() => {
                    spinner.value = false;
                });
            }
        };

        return { form, action, spinner, change };
    },
};
