import { computed, onMounted, defineAsyncComponent } from '@vue/runtime-core';
import { ref, onUnmounted } from 'vue';
import { alertConfirmationBulma } from '@/core/global/alert';
import alertBulma from '../../core/global/alert';
import { animationScroll } from '@/core/global/animation';
import { cartStore } from '../../store/cart';
import { utilitiesStore } from '../../store/utilities';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { productStore } from '../../store/product';
import { notificationStore } from '@/store/notification';
import moment from 'moment';

export default {
  components: {
    SpinnerComponent: defineAsyncComponent(() =>
      import('@/components/spinner/spinner.component.vue')
    ),
  },
  setup() {
    const authStore = useStore();

    const auth = computed(() => {
      return authStore.state.auth;
    });

    const isActive = ref(true);

    const search = ref('');

    const el = ref({ clientHeight: 600 });
    const page = ref(1);
    const myEventHandler = () => {
      utilitiesStore.state.headerHeight = el.value.clientHeight;
    };

    const getNotifications = () => {
      notificationStore
        .dispatch('get', page.value)
        .catch((error) => {
          alertBulma(
            'warning',
            'Error',
            'Hubo un fallo a la hora de cargar las notificaciones'
          );
        })
        .then(() => {
          isActive.value = false;
        });
    };

    onMounted(() => {
      window.addEventListener('resize', myEventHandler);
      myEventHandler();
      utilitiesStore.state.headerHeight = el.value.clientHeight;

      if (auth.value.id) {
        if (auth.value.role === 'admin') {
          getNotifications();
        }
      }
    });

    const notifications = computed(() => {
      return notificationStore.state.notifications;
    });

    const pagination = (event: any) => {
      if (
        event.target.scrollHeight - event.target.scrollTop ===
        event.target.clientHeight
      ) {
        page.value = page.value + 1;
        if (notificationStore.state.paginate.meta.last_page >= page.value) {
          isActive.value = true;
          getNotifications();
        }
      }
    };

    const dateParse = (value: string) => {
      if (value !== '') {
        moment.updateLocale('es', {
          relativeTime: {
            future: 'en %s',
            past: 'hace %s',
            s: '1m',
            ss: '%ds',
            m: '1m',
            mm: '%dm',
            h: '1h',
            hh: '%dh',
            d: '1d',
            dd: '%dd',
            w: '1sem',
            ww: '%dsem',
            M: 'un mes',
            MM: '%d meses',
            y: 'un año',
            yy: '%d años',
          },
        });
        return moment(value).fromNow(true);
      }
    };

    onUnmounted(() => {
      window.removeEventListener('resize', myEventHandler);
    });

    const countNotification = computed(() => {
      return notificationStore.state.count;
    });

    const router = useRouter();
    const route = useRoute();

    const viewBtn = ref([
      {
        name: 'Ingresa',
        url: '/auth/sign-in',
        view: !authStore.state.auth.id,
      },
      {
        name: 'Crea tu cuenta',
        url: '/auth/sign-up',
        view: !authStore.state.auth.id,
      },
    ]);

    const searchProduct = async () => {
      if (route.name === 'home') {
        await productStore
          .dispatch(
            'getProducts',
            search.value !== '' ? { filter: { name: search.value } } : ''
          )
          .then(() => {
            animationScroll('#div-products', document);
          })
          .catch(() => {
            alertBulma(
              'warning',
              'Busqueda de un producto',
              'Hubo un problema con el servidor a la hora de buscar un producto'
            );
          });
      } else {
        router.push(`/home?search=${search.value}`);
      }
    };

    const product = () => {
      if (route.name === 'home') {
        animationScroll('#div-products', document);
      } else {
        router.push('/home');
      }
    };

    const view = (row: any) => {
      if (row === 'all') {
        notificationStore.dispatch('viewAll').catch(() => {
          alertBulma(
            'warning',
            'Error',
            'Hubo un problema en la comunicación con el servidor'
          );
        });
      } else {
        if (!row.view) {
          notificationStore.dispatch('viewOne', row.id);
        }
      }
    };

    const logout = () => {
      alertConfirmationBulma(
        'warning',
        'Confirmación',
        '¿Estás seguro que deseas cerrar la sesión?',
        () => {
          authStore
            .dispatch('logOut')
            .then(() => {
              authStore.dispatch('checkSession').catch(() => {
                // VOID
              });
              utilitiesStore.commit('setToggled', false);
              cartStore.commit('setProducts', []);
              router.push('/');
            })
            .catch((error: any) => {
              alertBulma(
                'warning',
                'Error',
                'Lamentablemente no pudimos cerrar la sesión, vuelve a intentarlo',
                { label: 'Entendido' }
              );
            });
        }
      );
    };

    const changeCart = () => {
      utilitiesStore.commit('setActiveMenu', 'cart');
    };
    return {
      auth,
      logout,
      product,
      viewBtn,
      el,
      changeCart,
      searchProduct,
      search,
      router,
      countNotification,
      notifications,
      view,
      pagination,
      dateParse,
      isActive,
    };
  },
};
