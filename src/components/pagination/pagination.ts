import { ref } from 'vue';
import { SetupContext } from '@vue/runtime-core';
export default {

    props: ['pages'],
    setup(props: any, { emit }: SetupContext) {
        const pageActive = ref(1);

        const changePage = (type: string, value = 0) => {
            if (type === 'next') {
                if (pageActive.value < props.pages) {
                    pageActive.value += 1;
                    emit('actionPagination', { type: 'next', value: pageActive.value });
                }
            } else if (type === 'previus') {
                if (props.pages >= pageActive.value && pageActive.value !== 1) {
                    pageActive.value -= 1;
                    emit('actionPagination', { type: 'previus', value: pageActive.value });
                }
            } else {
                pageActive.value = value;
                emit('actionPagination', { type: 'num', value });
            }
        };
        return { pageActive, changePage };
    },
};
