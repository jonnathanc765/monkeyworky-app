import { SetupContext, defineAsyncComponent } from '@vue/runtime-core';
export default {

    components: {
        MySales: defineAsyncComponent(() =>
            import('@/pages/admin/my-sales/my-sales.vue'),
        ),
    },
    setup(props: any, context: SetupContext) {
        const dismiss = () => {
            context.emit('dismissForm', true);
        };

        return { dismiss };
    },
};
