import { SetupContext } from '@vue/runtime-core';
export default {

    props: ['item'],
    setup(props: { item: {} }, context: SetupContext) {

        const dismiss = () => {
            context.emit('dismiss');
        };

        return { dismiss };
    },
};
