import moment from 'moment';
import { ref, onMounted, computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import alertBulma from '../../../core/global/alert';
export default {

    components: {
        Pagination: defineAsyncComponent(() =>
            import('@/components/pagination/pagination.vue'),
        ),
        SpinnerComponent: defineAsyncComponent(() =>
            import('@/components/spinner/spinner.component.vue'),
        ),
    },

    setup() {

        const authStore = useStore();
        const isActive = ref(true);

        const filter = ref({
            role: 'customer',
            page: 1,
        });

        onMounted(async () => {
            await get();
        });

        const get = async () => {
            await authStore.dispatch('getUsers', filter.value).catch(() => {
                alertBulma('danger', 'Error', 'Hubo un fallo en la comunicación con el servidor');
            }).finally(() => {
                isActive.value = false;
            });
        };

        const dateParse = (value: string) => {
            return moment(value).format('DD/MM/YYYY');
        };

        const people = computed(() => {
            return authStore.state.people;
        });

        const pagination = computed(() => {
            return authStore.state.pagination;
        });

        const actionPagination = async (action: { type: string, value: number }) => {

            isActive.value = true;
            filter.value.page = action.value;
            await get();
        };

        return { people, dateParse, pagination, isActive, actionPagination };
    },
};
