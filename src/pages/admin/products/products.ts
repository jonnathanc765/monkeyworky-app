import { categoriesStore } from '@/store/categories';
import { productStore } from '@/store/product';
import { computed } from '@vue/runtime-core';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import CardProductsComponent from '@/components/card-products/card-products.component.vue';

export default {

    components: {
        Form: defineAsyncComponent(() =>
            import('@/pages/admin/products/form/form.vue'),
        ),
        CardProductsComponent,
        Pagination: defineAsyncComponent(() =>
            import('@/components/pagination/pagination.vue'),
        ),
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        ButtonAdmin: defineAsyncComponent(() =>
            import('@/components/button-admin/button-admin.vue'),
        ),
    },
    setup() {

        const interv = ref(null as any);
        const isActive = ref(true);
        const item = ref({});
        const modal = ref(false);
        const filter = ref({
            name: '',
        });

        const textView = ref('Estás viendo todos los productos');

        onMounted(async () => {
            await productStore.dispatch('getProducts').finally(() => {
                isActive.value = false;
            });
        });

        const categories = computed(() => {
            return categoriesStore.state.categories;
        });

        const products = computed(() => {
            return productStore.state.products;
        });

        const pagination = computed(() => {
            return productStore.state.pagination;
        });

        const actionPagination = async (action: { value: number }) => {
            isActive.value = true;
            await productStore.dispatch('getProducts', { pagination: { page: action.value } }).finally(() => {
                isActive.value = false;
            });
        };

        const searchProduct = () => {
            isActive.value = true;
            if (interv.value === null) {
                interv.value = setTimeout(async () => {
                    textView.value = (filter.value.name !== '') ? `Estás viendo los productos que coinciden con la busqueda "${filter.value.name}"` : 'Estás viendo todos los productos';
                    await productStore.dispatch('getProducts', (filter.value.name !== '') ? { filter: { name: filter.value.name } } : '').finally(() => {
                        isActive.value = false;
                    });
                    interv.value = null;
                }, 1500);
            }
        };

        const searchCategory = async (event: any) => {
            isActive.value = true;
            textView.value = (event.target.value === 'all') ? 'Estás viendo todos los productos' : 'Estás viendo los productos por categoría';
            await productStore.dispatch('getProducts', (event.target.value !== 'all') ? { filter: { category: event.target.value } } : '').finally(() => {
                isActive.value = false;
            });
        };

        const editProduct = (data: any) => {
            console.log('evnet', data);
            item.value = data;
            modal.value = true;
        };

        const addProduct = () => {
            item.value = {};
            modal.value = true;
        };

        const dismissForm = () => {
            modal.value = false;
        };

        return { categories, addProduct, products, searchProduct, filter, searchCategory, isActive, pagination, actionPagination, textView, editProduct, item, modal, dismissForm };
    },
};
