import socials from '@/core/data/footer-socials.json';
import contacts from '@/core/data/footer-contacts.json';
import { SetupContext } from '@vue/runtime-core';
import { Data } from '../../core/interfaces/Data.interface';
import { computed } from 'vue';
import { utilitiesStore } from '../../store/utilities';

export default {
    name: 'FooterComponent',
    props: ['categories'],
    setup(props: Data, context: SetupContext) {
        const lower = (value: string) => {
            return value.toLocaleLowerCase();
        };

        const filterCategory = (id: number) => {
            context.emit('filterCategory', id);
            context.emit('filter');

        };

        const toggled = computed(() => {
            return utilitiesStore.state.toggled;
        });

        return { socials, contacts, lower, toggled, filterCategory };
    },
};
