import { ref, onMounted, defineAsyncComponent } from 'vue';
import { computed } from '@vue/runtime-core';
import { cartStore } from '../../store/cart';
import alertBulma from '../../core/global/alert';
import { useRouter } from 'vue-router';
import { utilitiesStore } from '../../store/utilities';
import { useStore } from 'vuex';

export default {
    name: 'Cart',
    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        Products: defineAsyncComponent(() =>
            import('@/pages/check-out/products/products.vue'),
        ),
        Modal: defineAsyncComponent(() =>
            import('@/pages/cart/modal/modal.vue'),
        ),
    },
    setup() {
        const infoPrice = ref([
            {
                name: 'Subtotal',
            },
            {
                name: 'IVA',
            },
            {
                name: 'Total',
            },
            {
                name: 'TotalUSD',
            },
            {
                name: 'Productos',
            },
            {
                name: 'Items',
            },
        ]);

        const authStore = useStore();

        const router = useRouter();

        const isActive = ref(true);
        const isModal = ref(false);

        const infoCart = ref([
            '',
            'Cantidad',
            'Precio',
            'Variación',
        ]);


        onMounted(async () => {
            if (authStore.getters.isAuth) {
                await cartStore.dispatch('getCartApi').catch((error: any) => {
                    console.log(error);
                    alertBulma('warning', 'Error', 'No pudimos cargar la lista de artículos del carrito, por favor recarga la página', { label: 'Entendido' });
                }).finally(() => {
                    isActive.value = false;
                });
            } else {
                cartStore.dispatch('getCartLocal');
                isActive.value = false;
            }

            cartStore.dispatch('values');
        });

        const products = computed(() => {
            return cartStore.state.products;
        });

        const iva = computed(() => {
            return cartStore.state.iva;
        });

        const totalusd = computed(() => {
            return cartStore.state.subtotal;
        });

        const productos = ref(0);
        const items = ref(0);

        const subtotal = computed(() => {
            return cartStore.state.subtotal;
        });

        const total = computed(() => {
            calcTotalProduct();
            return cartStore.state.total;
        });

        const textProuct = (row: any, index: number) => {
            switch (index) {
                case 0:
                    return row.product.name;
                case 1:
                    return row.quantity;
                case 2:
                    return row.variation.price;
                case 3:
                    return row.variation.size;
            }
        };

        const pay = () => {
            if (authStore.getters.isAuth) {
                if (authStore.state.auth.people.phone) {
                    utilitiesStore.commit('setActiveMenu', 'cart');
                    router.push('/shopping-cart/payment');
                } else {
                    isModal.value = true;
                }
            } else {
                alertBulma('warning', 'Sin autenticar', 'Para poder continuar debes iniciar sesión');
            }
        };

        const calcTotalProduct = () => {
            productos.value = 0;
            items.value = products.value.length;
            for (const row of products.value) {
                productos.value += row.quantity;
            }
        };

        const dismissForm = () => {
            isModal.value = false;
        };

        return { infoPrice, products, infoCart, textProuct, subtotal, iva, total, pay, isActive, productos, calcTotalProduct, items, isModal, dismissForm, totalusd };
    },
};
