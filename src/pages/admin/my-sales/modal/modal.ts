import { checkOut } from '@/store/checkOut';
import { defineAsyncComponent, SetupContext } from '@vue/runtime-core';
import { removeClassValidation } from '../../../../core/global/validation';
import { ref, onMounted, onUnmounted } from 'vue';
import alertBulma from '../../../../core/global/alert';
import { useRouter } from 'vue-router';
import { alertBulmaInputEmpty } from '../../../../core/global/alert';
import { errorsApi } from '../../../../core/global/errors';

export default {
  props: ['amount', 'id'],
  components: {
    RegisterPay: defineAsyncComponent(() =>
      import('@/pages/check-out/register-pay/register-pay.vue')
    ),
  },
  setup(props: { amount: number; id: number }, context: SetupContext) {
    const disabled = ref(false);
    const arrowVisible = ref(true);
    const router = useRouter();
    const dismiss = () => {
      removeClassValidation('#modal-my-sales', ['is-active']);
    };

    const addPay = () => {
      disabled.value = true;
      if (
        checkOut.state.registerPay.bankOrigin !== '' &&
        checkOut.state.registerPay.email !== '' &&
        checkOut.state.registerPay.name !== '' &&
        checkOut.state.registerPay.image !== ''
      ) {
        pay(props.id);
      } else {
        alertBulmaInputEmpty();
        disabled.value = false;
      }
    };

    const event = (e: any) => {
      arrowVisible.value =
        e.target.scrollHeight - e.target.scrollTop !== e.target.clientHeight;
    };

    const pay = async (id: number) => {
      await checkOut
        .dispatch('payApi', id)
        .then((res) => {
          alertBulma(
            'warning',
            'Pago exitoso',
            'El comprobante de pago se agregó satisfactoriamente'
          );
          dismiss();
          context.emit('dismissForm', true);
          router.push(`/order/${id}`);
        })
        .catch((error) => {
          console.log(error);
          disabled.value = false;
          if (error.status === 422) {
            const errors = errorsApi(error.data.errors);
            alertBulma(
              'warning',
              'Se encontraron los siguientes errores',
              `${errors}`
            );
            return;
          }
          alertBulma(
            'warning',
            'Error',
            'Hubo un problema a la hora de procesar su pago'
          );
        });
    };

    const arrow = () => {
      const scroll = document.getElementById('section-my-sales');
      if (scroll) {
        scroll.scrollTop = scroll.scrollHeight;
      }
    };

    return { dismiss, addPay, disabled, arrowVisible, arrow, event };
  },
};
