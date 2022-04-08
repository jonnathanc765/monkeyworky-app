import { ref } from 'vue';
import { checkInputEmpty } from '../../../core/global/validation';
import { alertBulmaInputEmpty } from '../../../core/global/alert';
import alertBulma from '../../../core/global/alert';
import { useStore } from 'vuex';
import { errorsApi } from '../../../core/global/errors';
export default {

    setup() {
        const authStore = useStore();
        const disabled = ref(false);
        const form = ref({
            original_password: '',
            password: '',
            password_confirmation: '',
        });
        const changePassword = async () => {
            if (checkInputEmpty(form.value)) {
                if (form.value.password === form.value.password_confirmation) {
                    disabled.value = true;
                    await authStore.dispatch('changePassword', form.value).then(() => {
                        form.value.original_password = '';
                        form.value.password = '';
                        form.value.password_confirmation = '';
                        disabled.value = false;
                        alertBulma('warning', 'Cambio de contraseña', 'Se realizó el cambio de contraseña satisfactoriamente.');
                    }).catch((error) => {
                        disabled.value = false;
                        if (error.status === 422) {
                            const errors = errorsApi(error.data.errors);
                            alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`, { label: 'Entendido' });
                            return;
                        }
                        alertBulma('warning', 'Error', 'Hubo un fallo con el servidor a la hora de cambiar la contraseña');
                    });
                } else {
                    alertBulma('warning', 'Contraseñas no coinciden', 'Las contraseñas introducidas no coinciden');
                }
            } else {
                alertBulmaInputEmpty();
            }
        };

        return { form, changePassword, disabled };
    },
};
