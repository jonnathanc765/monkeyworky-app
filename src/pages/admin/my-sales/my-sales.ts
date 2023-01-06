import { onMounted, ref, onUpdated } from 'vue';
import { orderStore } from '../../../store/order';
import alertBulma from '../../../core/global/alert';
import { computed, defineAsyncComponent } from '@vue/runtime-core';
import moment from 'moment';
import { useRoute } from 'vue-router';
import { addClassValidation } from '../../../core/global/validation';
import { useStore } from 'vuex';
import { status, originalStatus } from '../../../core/global/statusOrder';

export default {
  components: {
    Modal: defineAsyncComponent(() =>
      import('@/pages/admin/my-sales/modal/modal.vue')
    ),
    Pagination: defineAsyncComponent(() =>
      import('@/components/pagination/pagination.vue')
    ),
    SpinnerComponent: defineAsyncComponent(() =>
      import('@/components/spinner/spinner.component.vue')
    ),
    ModalChange: defineAsyncComponent(() =>
      import('@/pages/orders/details/modal/modal.vue')
    ),
  },
  props: ['modal'],
  setup(props: { modal: boolean }) {
    const title = ref('MIS VENTAS');
    const route = useRoute();
    const itemId = ref(0);
    const itemValue = ref(0);
    const authStore = useStore();
    const isActive = ref(true);
    const filterStatus = ref(originalStatus());
    const searchStatus = ref('all');
    const isChange = ref(false);
    const row = ref({});

    onMounted(async () => {
      if (authStore.state.auth.role === 'customer') {
        title.value = 'MIS ORDENES';
      }

      if (route.name === 'registerPayment') {
        title.value = 'REGISTRO DE PAGOS';
        searchStatus.value = 'pending_for_payment';
      } else if (route.name === 'mySales' || props.modal) {
        if (authStore.state.auth.role === 'customer') {
          title.value = 'MIS ORDENES';
        }
      }

      await getOrders();
    });

    onUpdated(async () => {
      if (route.name === 'registerPayment') {
        title.value = 'REGISTRO DE PAGOS';
      } else if (route.name === 'mySales') {
        if (authStore.state.auth.role === 'customer') {
          title.value = 'MIS ORDENES';
        }
      }
    });

    const selectStats = async (event: any) => {
      isActive.value = true;
      searchStatus.value = event.target.value;
      await getOrders();
    };

    const getOrders = async (value?: any) => {
      await orderStore
        .dispatch(
          'getOrders',
          searchStatus.value !== 'all'
            ? { filter: { status: searchStatus.value } }
            : pagination.value
            ? { pagination: { page: value } }
            : ''
        )
        .catch((error) => {
          console.log(error);
          alertBulma(
            'warning',
            'Error',
            'No se pudieron cargar el listado de ordenes, por favor intente recargar la página',
            { label: 'Entendido' }
          );
        })
        .finally(() => {
          isActive.value = false;
        });
    };

    const caseStatus = (Status: string) => {
      return status(Status);
    };

    const auth = computed(() => {
      return authStore.state.auth;
    });

    const orders = computed(() => {
      return orderStore.state.orders;
    });

    const pagination = computed(() => {
      return orderStore.state.pagination;
    });

    const dateParse = (value: string) => {
      return moment(value).format('DD/MM/YYYY');
    };

    const actionPagination = async (action: {
      type: string;
      value: number;
    }) => {
      isActive.value = true;
      await getOrders(action.value);
    };

    const openModal = (id: number, amount: number) => {
      itemId.value = id;
      itemValue.value = amount;
      addClassValidation('#modal-my-sales', ['is-active']);
    };

    return {
      orders,
      title,
      dateParse,
      caseStatus,
      openModal,
      itemId,
      itemValue,
      pagination,
      actionPagination,
      isActive,
      filterStatus,
      selectStats,
      route,
      auth,
      isChange,
      row,
    };
  },
};
