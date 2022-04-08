import { ref, onUnmounted } from 'vue';
import { addClassValidation, removeClassValidation } from '../../core/global/validation';
import { onMounted, computed } from '@vue/runtime-core';

export default {
    name: 'vue-carousel',

    props: ['carouselItems'],

    setup(props: { carouselItems: [] }) {
        const currentIndex = ref(0);
        const interv = ref(null as any);
        const time = ref(8000);
        const remainingTime = ref(8000 as any);
        const startTime = ref(0);
        const isMobile = ref(false);

        onMounted(() => {
            isMobile.value = screen.width <= 760;
            interval();
        });

        onUnmounted(() => {
            clearTimeout(interv.value);
            interv.value = null;
        });

        const currentItem = computed(() => {
            return props.carouselItems[currentIndex.value];
        });

        const pause = () => {
            clearTimeout(interv.value);
            remainingTime.value = new Date().getTime() - startTime.value;
            remainingTime.value = remainingTime.value > time.value ? 0 : remainingTime.value;
        };

        const resume = () => {
            timer(time.value - remainingTime.value);
        };

        const nextItem = () => {
            (currentIndex.value === props.carouselItems.length - 1) ? animations(false) : animations();
            clearTimeout(interv.value);
            interval();
        };

        const prevItem = () => {
            (currentIndex.value === 0) ? animations(false, true) : animations(true, true);
            clearTimeout(interv.value);
            interval();
        };

        const interval = () => {
            startTime.value = new Date().getTime();
            timer(time.value);
        };

        const timer = (value: number) => {
            interv.value = setTimeout(() => {
                nextItem();
                clearTimeout(interv.value);
                interval();
            }, value);
        };

        const animations = (index = true, reverse = false) => {
            addClassValidation('#imgSrc', ['transitioning-src']);
            const timeout = setTimeout(() => {
                removeClassValidation('#imgSrc', ['transitioning-src']);
                reverse ? currentIndex.value = index ? currentIndex.value - 1 : props.carouselItems.length - 1 : currentIndex.value = index ? currentIndex.value + 1 : 0;
                clearTimeout(timeout);
            }, 400);
        };

        return { nextItem, interval, prevItem, pause, currentItem, resume, isMobile };
    },
};
