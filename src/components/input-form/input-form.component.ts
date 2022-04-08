import { Data } from '../../core/interfaces/Data.interface';
import { onBeforeUpdate, SetupContext } from '@vue/runtime-core';
import { ref, onUpdated, onMounted } from 'vue';
export default {
    name: 'InputFormComponent',
    emits: ['valueInput'],
    props: ['id', 'classArray', 'type', 'placeholder', 'classIcon', 'isSecurity', 'iconLeft'],
    setup(props: Data, context: SetupContext) {

        const value = ref('');
        const view = ref(false);
        const type = ref(props.type);
        const classIcon = ref(props.classIcon);

        const emitValue = () => {
            context.emit('valueInput', { key: props.id, value: value.value });
        };

        const changeType = () => {
            if (props.isSecurity) {
                if (!view.value) {
                    view.value = true;
                    type.value = 'text';
                    classIcon.value = 'fas fa-eye-slash color-red cursor-pointer z-index';
                } else {
                    view.value = false;
                    type.value = 'password';
                    classIcon.value = 'fas fa-eye color-red cursor-pointer z-index';
                }
            }
        };

        return { value, emitValue, changeType, type, classIcon };
    },
};
