import { defineComponent } from 'vue';
import CarouselComponent from '@/components/carousel/carousel.component.vue';
import banner from '@/core/data/banner.json';

export default defineComponent({
    name: 'BannerComponent',
    components: {
        CarouselComponent,
    },
    props: {
    },
    data() {
        return {
            banner,
        };
    },
});

