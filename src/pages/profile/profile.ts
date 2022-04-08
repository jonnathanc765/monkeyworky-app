import { ref, onMounted } from 'vue';
import { computed, defineAsyncComponent } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { addressStore } from '../../store/address';
import alertBulma from '../../core/global/alert';
import { errorsApi } from '../../core/global/errors';

export default {

    components: {
        Modal: defineAsyncComponent(() =>
            import('@/pages/check-out/address/modal/modal.vue'),
        ),
    },
    setup() {
        const form = ref({
            email: '',
            firstname: '',
            lastname: '',
            phone: '',
            state: '',
            dni: '',
            item: {},
        });

        const isMobile = ref(false);
        const isModal = ref(false);

        const disabled = ref(false);

        const authStore = useStore();

        const auth = computed(() => {
            return authStore.state.auth;
        });

        onMounted(async () => {
            isMobile.value = screen.width <= 780;
            form.value.email = auth.value.email;
            form.value.firstname = auth.value.people.firstname;
            form.value.lastname = auth.value.people.lastname;
            form.value.state = auth.value.people.state_id;
            form.value.phone = auth.value.people.phone;
            form.value.phone = auth.value.people.dni;


            await addressStore.dispatch('getStates').catch(() => {
                alertBulma('warning', 'Error', 'Hubo un problema a la hora de cargar los estados');
            });

            if (auth.value.role === 'customer') {
                await addressStore.dispatch('get').catch(() => {
                    alertBulma('warning', 'Error en las direcciones', 'Hubo un problema a la hora de cargar las direcciones, por favor recarga la página');
                });
            }
        });

        const states = computed(() => {
            return addressStore.state.states;
        });

        const addresses = computed(() => {
            return addressStore.state.addresses;
        });

        const select = (event: any) => {
            const values = addresses.value.find((res) => res.address_id === Number(event.target.value));
            if (values) {
                form.value.item = values;
                return;
            }
            form.value.item = {};
        };

        const selectState = (event: any) => {
            form.value.state = event.target.value;
        };

        const changeData = async () => {
            disabled.value = true;
            await authStore.dispatch('changeProfile', form.value).then((resp) => {
                alertBulma('warning', 'Actualización del perfil', 'Se actualizó el perfil satisfactoriamente');
            }).catch((error) => {
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`, { label: 'Entendido' });
                    return;
                }
                alertBulma('warning', 'Actualización de perfil', 'Hubo un problema a la hora de actualizar el perfil, intente nuevamente');
            }).finally(() => {
                disabled.value = false;
            });
        };

        return { form, addresses, select, changeData, disabled, auth, states, selectState, isMobile, isModal };
    },
};
