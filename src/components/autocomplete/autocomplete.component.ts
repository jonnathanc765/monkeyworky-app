import { ref } from 'vue';
import { SetupContext } from '@vue/runtime-core';
export default {

    props: ['items', 'icon', 'placeholder'],

    setup(props: { items: any }, context: SetupContext) {

        const text = ref(props.items) as any;
        const textInput = ref<string>('');
        const textLower = ref<string[]>([]);
        const isVisible = ref(false);


        const showItems = (item: []) => {
            return item.slice(0, 6);
        };

        const changeText = () => {
            isVisible.value = true;
            const textCompare = textInput.value.toLowerCase();
            textLower.value = [];
            text.value = [];

            for (const row of props.items) {
                textLower.value.push(row.toLowerCase());
            }

            textLower.value.forEach((row, index) => {
                if (row.indexOf(textCompare) !== -1) {
                    text.value.push(props.items[index]);
                }
            });
            sendAutocomplete();
        };

        const sendAutocomplete = () => {
            context.emit('autocompleteText', textInput.value);
        };

        return { showItems, text, textInput, changeText, isVisible, sendAutocomplete };
    },
};
