<template>
  <div class="columns is-justify-content-center">
    <div class="banner-container column is-12 is-12-mobile has-text-black">
      <CarouselComponent
        v-if="banners.length > 0"
        class="banner-img"
        :carouselItems="banners"
      ></CarouselComponent>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import CarouselComponent from '@/components/carousel/carousel.component.vue';
import { AxiosService } from '@/core/services/axios.service';

export default defineComponent({
    name: 'BannerComponent',
    components: {
      CarouselComponent,
    },
    props: {
    },
    data() {
      return {
        banners: [],
      };
    },
    async mounted() {
        this.fetch()
    },
    methods: {
      async fetch() {
        await AxiosService.endPoint()
          .get('/public/banners')
          .then(result => {
            this.banners = result.data.map((banner) => {
              let img = banner.picture_url
              return {
                img,
                imgPhone: img
              }
            })
          })
      },
    }
});

</script>
<style lang="scss" src="./banner.component.scss" />
