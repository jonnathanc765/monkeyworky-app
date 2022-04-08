import { ref, onMounted, onUnmounted } from 'vue';
import { bankStore } from '../../../../store/bank';
import alertBulma from '../../../../core/global/alert';
import { errorsApi } from '../../../../core/global/errors';
import { SetupContext, computed, defineAsyncComponent } from '@vue/runtime-core';
export default {

    props: ['item'],

    components: {
        AutocompleteComponent: defineAsyncComponent(() =>
            import('@/components/autocomplete/autocomplete.component.vue'),
        ),
    },

    setup(props: { item: any }, context: SetupContext) {

        const disabled = ref(false);
        const arrowVisible = ref(true);
        const form = ref({
            name: props.item.name || '',
            account_number: props.item.account_number || '',
            owner: props.item.owner || '',
            email: props.item.email || '',
            phone: props.item.phone || '',
            dni: props.item.dni || '',
            type: props.item.type || '',
        });

        const event = (e: any) => {
            arrowVisible.value = (e.target.scrollHeight - e.target.scrollTop) !== e.target.clientHeight;
        };

        const dismiss = () => {
            context.emit('dismissForm', true);
        };

        const arrow = () => {
            const scroll = document.getElementById('section-form-banks');
            if (scroll) {
                scroll.scrollTop = scroll.scrollHeight;
            }
        };

        const bankNames = computed(() => {
            return bankStore.state.bankDestinationBs;
        });

        const action = async () => {
            disabled.value = true;
            await bankStore.dispatch(props.item.bank_id ? 'update' : 'post', props.item.bank_id ? { data: form.value, id: props.item.bank_id } : form.value).then(() => {
                if (!props.item) {
                    form.value = { account_number: '', dni: '', email: '', name: '', owner: '', phone: '', type: '' };
                }
                dismiss();
                alertBulma('warning', props.item.bank_id ? 'Actualización de banco' : 'Registro de banco', props.item.bank_id ? 'Se actualizó el banco satisfactoriamente' : 'Se agregó el banco satisfactoriamente');
            }).catch((error) => {
                if (error.status === 422) {
                    const errors = errorsApi(error.data.errors);
                    alertBulma('warning', 'Se encontraron los siguientes errores', `${errors}`);
                    return;
                }
                alertBulma('warning', 'Error desconocido', 'Lo sentimos, pero hubo problemas con la comunicación con nuestros servidores.');
            }).finally(() => { disabled.value = false; });
        };

        const codeBank = computed(() => {
            return bankStore.state.codeBs;
        });

        const getText = (data: string) => {
            form.value.name = data;
            (codeBank.value[data]) ? form.value.account_number = codeBank.value[data] + '-' : form.value.account_number = '';
        };

        return { dismiss, form, action, disabled, arrow, arrowVisible, bankNames, getText, event };
    },
};
