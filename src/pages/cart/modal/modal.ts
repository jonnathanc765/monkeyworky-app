import { ref } from 'vue';
import { SetupContext, computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import alertBulma from '../../../core/global/alert';
import { errorsApi } from '../../../core/global/errors';
import { utilitiesStore } from '../../../store/utilities';
import { useRouter } from 'vue-router';
export default {

    setup(props: any, context: SetupContext) {
        const phone = ref('');
        const authStore = useStore();
        const disabled = ref(false);
        const router = useRouter();

        const dismiss = () => {
            context.emit('dismissForm', true);
        };

        const auth = computed(() => {
            return authStore.state.auth;
        });

        const save = async () => {
            if (phone.value.length > 10) {
                disabled.value = true;
                await authStore.dispatch('changeProfile', { ...auth.value.people, phone: phone.value, state: auth.value.people.state_id }).then(() => {
                    alertBulma('warning', 'Actualización de número', 'Se agregó el número de teléfono satisfactoriamente');
                    utilitiesStore.commit('setActiveMenu', 'cart');
                    router.push('/shopping-cart/payment');
                }).catch((error) => {
                    if (error.status === 422) {
                        const errors = errorsApi(error.data.errors);
                        alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`, { label: 'Entendido' });
                        return;
                    }
                    alertBulma('warning', 'Actualización de número', 'Hubo un problema a la hora de actualizar el teléfono, intente nuevamente');
                }).finally(() => {
                    disabled.value = false;
                });
            } else {
                alertBulma('warning', 'Error', 'El número de teléfono debe incluir el código de la compañía más los 7 dígitos');
            }
        };

        return { phone, dismiss, save };
    },
};
