import { SetupContext } from '@vue/runtime-core';
import { originalStatus, status } from '../../../../core/global/statusOrder';
import { ref } from 'vue';
import { orderStore } from '../../../../store/order';
import { errorsApi } from '@/core/global/errors';
import alertBulma from '../../../../core/global/alert';
export default {

    props: ['item'],
    setup(props: { item: any }, context: SetupContext) {
        const statuses = ref(originalStatus());
        const disabled = ref(false);
        const newStatus = ref('');

        const dismiss = () => {
            context.emit('dismissForm', true);
        };

        const returnStatus = (row: string) => {
            return status(row);
        };

        const change = (event: any) => {
            newStatus.value = event.target.value;
        };

        const changeStatus = async () => {
            disabled.value = true;
            await orderStore.dispatch('put', { id: props.item.id, status: newStatus.value }).then(() => {
                alertBulma('warning', 'Actualización de orden', 'Se cambió el estado de la orden satisfactoriamente');
            }).catch((error) => {
                switch (error.status) {
                    case 422:
                        const errors = errorsApi(error.data.errors);
                        alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`);
                        return;
                    case 404:
                        alertBulma('warning', 'Error', `No se encontró la orden, por favor recarga la página`);
                        return;
                    case 400:
                        if (error.data.code) {
                            if (error.data.code === 'H0024') {
                                alertBulma('warning', 'Error', 'Esta orden se encuentra con estado entregada y no puede ser modificada');
                                return;

                            } else if (error.data.code === 'H0023') {
                                alertBulma('warning', 'Error', 'Esta orden se encuentra con estado rechazada y no puede ser modificada');
                                return;
                            }
                        }
                }
                alertBulma('warning', 'Error desconocido', 'Lo sentimos, pero hubo problemas con la comunicación con nuestros servidores.');
            }).finally(() => { disabled.value = false; });
        };

        return { dismiss, statuses, returnStatus, change, changeStatus, disabled };
    },
};
