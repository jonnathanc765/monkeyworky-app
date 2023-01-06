import { checkOut } from '@/store/checkOut';
import { ref, computed, onMounted } from 'vue';
import { cartStore } from '../../../store/cart';
import { bankStore } from '../../../store/bank';
import alertBulma from '../../../core/global/alert';
export default {
  props: ['amount', 'isModal'],
  setup(props: { amount: number; isModal: boolean }) {
    const registerPay = ref({
      isCash: false,
      bankOrigin: '' as any,
      bankDestination: '' as any,
      reference: '',
      date: '',
      amount: 0,
      image: '',
      email: '',
      name: '',
    });

    const isBs = ref(false);

    onMounted(() => {
      if (props.isModal) {
        registerPay.value.amount = props.amount;
      }

      bankStore.dispatch('get').catch(() => {
        alertBulma(
          'warning',
          'Error al cargar los bancos',
          'Hubo un problema en la comunicación del servidor y no pudimos cargar los bancos, por favor recarga la página'
        );
      });
    });

    const banks = computed(() => {
      return bankStore.state.banks;
    });

    const truncate = computed(() => {
      return checkOut.state.truncate;
    });

    const banksDestination = computed(() => {
      if (!isBs.value) {
        registerPay.value.bankDestination =
          bankStore.state.bankDestinationBs[0];
      }
      return bankStore.state.banksDestination;
    });

    const bankDestinationBs = computed(() => {
      if (isBs.value) {
        registerPay.value.bankDestination =
          bankStore.state.bankDestinationBs[0];
      }
      return bankStore.state.bankDestinationBs;
    });

    const total = computed(() => {
      if (!props.isModal) {
        registerPay.value.amount = isBs.value
          ? cartStore.state.total
          : cartStore.state.subtotal;
        return isBs.value ? cartStore.state.total : cartStore.state.subtotal;
      } else {
        registerPay.value.amount = props.amount;
        return props.amount;
      }
    });

    const selectDestination = (event: any) => {
      registerPay.value.bankDestination = event.target.value;
    };

    /* ESTO ESTÁ AL CONTRARIO -.- */
    const select = (event: any) => {
      if (event.target.value !== 'Seleccione') {
        const bank = banks.value.find(
          (res) => res.bank_id === Number(event.target.value)
        );
        if (bank) {
          registerPay.value.bankOrigin = bank.bank_id;
          isBs.value = bank.type === 'BS';
        }
      } else {
        registerPay.value.bankOrigin = '';
      }
      addForm();
    };

    const addForm = () => {
      checkOut.commit('setRegisterPay', registerPay.value);
    };

    const getImage = (event: any) => {
      if (event.target.files[0].size > 6556410) {
        alertBulma(
          'warning',
          'Error',
          'El comprobante de pago no puede pesar más de 6MB'
        );
      } else if (
        event.target.files[0].type !== 'image/jpg' &&
        event.target.files[0].type !== 'image/png' &&
        event.target.files[0].type !== 'image/jpeg'
      ) {
        alertBulma(
          'warning',
          'Error',
          'El comprobante de pago debe tener un formato .JPG, .PNG o .pdf'
        );
      } else {
        registerPay.value.image = event.target.files[0];
        addForm();
        return;
      }
      registerPay.value.image = '';
      addForm();
    };

    return {
      registerPay,
      select,
      addForm,
      total,
      getImage,
      banks,
      banksDestination,
      selectDestination,
      isBs,
      bankDestinationBs,
      truncate,
    };
  },
};
