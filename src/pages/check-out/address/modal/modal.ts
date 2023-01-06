import { SetupContext, computed } from '@vue/runtime-core';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { addressStore } from '../../../../store/address';
import alertBulma from '../../../../core/global/alert';
import { checkOut } from '../../../../store/checkOut';
import { errorsApi } from '../../../../core/global/errors';

export default {
  props: ['item'],
  setup(props: any, context: SetupContext) {
    const authStore = useStore();

    const isLoadingState = ref(true);
    const isLoadingMun = ref(true);
    const isLoadingParishes = ref(true);
    const arrowVisible = ref(true);
    const municipality = ref(0);
    const parish = ref(0);
    const form = ref({
      address: '',
      comment: '',
      type: '',
      name: '',
    });
    const disabled = ref(false);

    const getMunicipality = async (id: number) => {
      console.log(id);
      isLoadingMun.value = true;
      addressStore.commit('setMunicipalities', []);
      addressStore.commit('setParishes', []);
      await addressStore
        .dispatch('getMunicipality', id)
        .then((res) => {
          municipality.value = res[0].id;
        })
        .catch(() => {
          alertBulma('warning', 'Error', 'No se pudo cargar los municipios');
        })
        .finally(() => {
          isLoadingMun.value = false;
        });
    };

    const auth = computed(() => {
      if (authStore.state.auth.people) {
        getMunicipality(authStore.state.auth.people.state_id);
      }
      return authStore.state.auth;
    });

    const state = ref(auth.value.people.state_id);

    onMounted(async () => {
      await addressStore
        .dispatch('getStates')
        .catch(() => {
          alertBulma(
            'warning',
            'Error',
            'Hubo un problema a la hora de cargar los estados'
          );
        })
        .finally(() => {
          isLoadingState.value = false;
        });

      if (props.item) {
        form.value = props.item;
      }
    });

    const eventScroll = (e: any) => {
      arrowVisible.value =
        e.target.scrollHeight - e.target.scrollTop !== e.target.clientHeight;
    };

    const states = computed(() => {
      return addressStore.state.states;
    });

    const municipalities = computed(() => {
      if (addressStore.state.municipalities.length > 0) {
        getParishes(addressStore.state.municipalities[0].id);
      }
      return addressStore.state.municipalities;
    });

    const parishes = computed(() => {
      return addressStore.state.parishes;
    });

    const dismiss = () => {
      context.emit('dismissForm', true);
    };

    const getParishes = async (id: number) => {
      isLoadingParishes.value = true;
      addressStore.commit('setParishes', []);
      await addressStore
        .dispatch('getParishes', id)
        .then((res) => {
          parish.value = res[0].id;
        })
        .catch(() => {
          alertBulma('warning', 'Error', 'No se pudo cargar las parroquias');
        })
        .finally(() => {
          isLoadingParishes.value = false;
        });
    };

    const changeMunicipality = (event: any) => {
      municipality.value = event.target.value;
      getParishes(event.target.value);
    };

    const changeState = (event: any) => {
      state.value = event.target.value;
      getMunicipality(event.target.value);
    };

    const changeParish = (event: any) => {
      parish.value = event.target.value;
    };

    const addAddress = () => {
      disabled.value = true;
      addressStore
        .dispatch('post', { parish: parish.value, ...form.value })
        .then((res) => {
          console.log(res);
          alertBulma(
            'warning',
            'Registro de dirección',
            'Se añadió satisfactoriamente la dirección en la base de datos'
          );
          dismiss();
        })
        .catch((error) => {
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
            'Registro de dirección',
            'No se pudo registrar la nueva dirección, intente nuevamente'
          );
        })
        .finally(() => {
          disabled.value = false;
        });
    };

    const arrow = () => {
      const scroll = document.getElementById('section-address');
      if (scroll) {
        scroll.scrollTop = scroll.scrollHeight;
      }
    };

    return {
      dismiss,
      auth,
      changeState,
      states,
      isLoadingState,
      isLoadingMun,
      state,
      municipalities,
      parishes,
      changeMunicipality,
      isLoadingParishes,
      changeParish,
      addAddress,
      form,
      disabled,
      arrow,
      arrowVisible,
      eventScroll,
    };
  },
};
