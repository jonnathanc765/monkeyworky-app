import { computed, SetupContext } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { addClassValidation } from '../../core/global/validation';

export default {
  props: ['item'],
  setup(props: { item: {} }, context: SetupContext) {
    const dismiss = () => {
      context.emit('dismiss');
    };

    const authStore = useStore();

    const addCart = () => {
      context.emit('getItem', props.item);
      addClassValidation('#modal-products', ['is-active']);
    };

    const auth = computed(() => {
      return authStore.state.auth;
    });

    return { dismiss, addCart, auth };
  },
};
