import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CardComponent',
    props: {
        item: {
            type: Object as any,
            required: true,
        },
        end: {
            type: Number,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
});
