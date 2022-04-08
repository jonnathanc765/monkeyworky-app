import { SetupContext } from '@vue/runtime-core';
export default {

    props: ['itemCategory'],
    setup(props: { itemCategory: {} }, context: SetupContext) {
        

        const dismiss = () => {
            context.emit('dismiss');
        };

        const subCategory = (id: number) => {
            context.emit('headerSubCategory', id);
            dismiss();
        };

        return {
            dismiss,  subCategory
        };
    },
};
