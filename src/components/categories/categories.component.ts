import { defineComponent } from 'vue';
import { SetupContext } from '@vue/runtime-core';

export default defineComponent({
    name: 'CategoriesComponent',
    props: {
        item: {
            required: true,
            type: Object as any,
        },
    },


    setup(props: { item: any }, context: SetupContext) {
        console.log(props);
        const openCategory = () => {
            context.emit('openCategory', props.item);
        };
        
        const category = () => {
            context.emit('headerCategory');
        };
        const subCategory = (id: number) => {
            context.emit('headerSubCategory', id);
        };
        
        return { openCategory, category, subCategory };
    },
});
