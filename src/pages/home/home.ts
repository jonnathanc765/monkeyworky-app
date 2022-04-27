import { ref, defineAsyncComponent } from 'vue';
import cardInformation from '@/core/data/card-banner.json';
import { animationScroll } from '../../core/global/animation';
import { onMounted } from 'vue';
import { computed } from '@vue/runtime-core';
import { productStore } from '@/store/product';
import { categoriesStore } from '@/store/categories';
import { useRoute } from 'vue-router';
import CardProductsComponent from '@/components/card-products/card-products.component.vue';
import CategoriesComponent from '@/components/categories/categories.component.vue';
import '@/assets/js/scrollbar.js';

export default {
    name: 'App',
    components: {
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
        CategoriesComponent,
        ModalSubCategory: defineAsyncComponent(() =>
            import('@/components/modal-subcategory/modal-subcategory.vue'),
        ),
        BannerComponent: defineAsyncComponent(() =>
            import('@/components/banner/banner.component.vue'),
        ),
        CardComponent: defineAsyncComponent(() =>
            import('@/components/card/card.component.vue'),
        ),
        CardProductsComponent,
        ModalProducts: defineAsyncComponent(() =>
            import('@/components/modal-products/modal-products.vue'),
        ),
        Pagination: defineAsyncComponent(() =>
            import('@/components/pagination/pagination.vue'),
        ),
        ModalProductInfo: defineAsyncComponent(() =>
            import('@/components/modal-product-info/modal-product-info.vue'),
        ),
    },


    setup() {

        const categoryIdFooter = ref();
        const item = ref('');
        const itemCategory = ref('');
        const maxPages = ref(15);
        const isActive = ref(true);
        const route = useRoute();
        const categoriesVisible = ref(true);
        const mobile = ref(false);
        const navbar = ref(false);
        const isModalInfo = ref(false);
        const isCategoryInfo = ref(false);

        onMounted(async () => {
            navbar.value = isFixed();
            mobile.value = isMobile();
            await productStore.dispatch('getProducts', (route.query.search) ? { filter: { name: route.query.search } } : route.query.category ? { filter: { category: route.query.category } } : '').finally(() => {
                isActive.value = false;
            });
        });

        const products = computed(() => {
            return productStore.state.products;
        });

        const categories = computed(() => {
            return categoriesStore.state.categories;
        });

        const pagination = computed(() => {
            return productStore.state.pagination;
        });

        const getData = (data: any) => {
            item.value = data;
        };

        const openInfo = (data: any) => {
            item.value = data;
            isModalInfo.value = true;
        };
        

        const openCategory = (data: any) => {
            itemCategory.value = data;
            console.log(itemCategory.value)
            isCategoryInfo.value = true;
        };

        const filterCategory = async (id: number) => {
            animationSelector('#div-products');
            isActive.value = true;
            await productStore.dispatch('getProducts', { filter: { category: id } }).finally(() => {
                isActive.value = false;
            });
        };

        

        const actionPagination = async (action: { type: string, value: number }) => {

            isActive.value = true;
            await productStore.dispatch('getProducts', { pagination: { page: action.value } }).finally(() => {
                isActive.value = false;
            });
        };

        const setCategoryVisible = (cat: boolean) => {
            categoriesVisible.value = cat;
        };

        const animationSelector = (selector: string) => {
            animationScroll(selector, document);
        };

        const isFixed = (): boolean => {
            // Get the current scroll position
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
            // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
            if (currentScrollPosition > 200) {
               return true
            }
            return false;
        }

        const isMobile = () => {
            if (screen.width <= 760) {
                categoriesVisible.value = false;
                return true;
            }
            return false;
        };

        const selectSubcategory = async (id: number) => {
            isActive.value = true;

            await productStore.dispatch('getProducts', { filter: { subCategory: id } })
                .finally(() => { isActive.value = false; });
            animationScroll('#div-products', document);
        };


        return {
            filterCategory,
            products,
            item,
            itemCategory,
            categories,
            getData,
            cardInformation,
            categoryIdFooter,
            maxPages,
            actionPagination,
            pagination,
            isActive,
            selectSubcategory,
            categoriesVisible,
            setCategoryVisible,
            mobile,
            navbar,
            isModalInfo,
            isCategoryInfo,
            openInfo,
            openCategory,
        };
    },
};
