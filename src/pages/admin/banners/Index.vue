<template>
  <div class="banners-list mb-5">
    <h2 class="text-bold mt-5">Gestion de banners</h2>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="my-5 mx-5">
            <label for="banner" :class="{ 'loading': loading }">
              Haz click aquí para subir un nuevo Banner:
              <div v-if="loading" class=" ms-2 spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </label>
            <input type="file" id="banner" :disabled="loading" ref="banner" @change="uploadFile" class="form-control d-none">
          </div>
          <div class="alert alert-warning mx-5" role="alert">
            Nota: Solo puedes tener un máximo de 5 Banners
          </div>
          <table class="table text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Miniatura</th>
                <th scope="col">Fecha</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(banner, index) of banners" :key="banner.id">
                <th scope="row">{{ banner.id }}</th>
                <td class="d-flex justify-content-center align-items-center">
                  <div id="thumbnail-container">
                    <img :src="`${$env.url}/storage/${banner.picture}`" alt="Banner">
                  </div>
                </td>
                <td>{{ formatDate(banner.created_at) }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    :disabled="loading"
                    @click="destroy(banner.id, index)"
                  >Borrar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { AxiosService } from '@/core/services/axios.service'

export default {
  data() {
    return {
      banners: [],
      loading: false
    }
  },
  async mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      await AxiosService.endPoint()
        .get('/public/banners')
        .then(result => {
          this.banners = result.data
        })
    },
    async destroy(id, index) {
      const result = confirm('Estás seguro de borrar este Banner?')
      if (!result) return;
      this.loading = true
      await AxiosService.endPoint()
        .delete(`/public/banners/${id}`)
        .then(() => {
          this.banners.splice(index, 1)
          this.loading = false
        })
    },
    async uploadFile() {
      this.loading = true
      const formData = new FormData()
      formData.append('picture', this.$refs.banner.files[0])
      formData.append('position', 'main')
      await AxiosService.endPoint()
        .post('/public/banners', formData)
        .then(() => {
          this.fetch();
          this.loading = false
        })
    },
    formatDate(date) {
      return moment(date).fromNow()
    }
  }
}
</script>

<style lang="scss">
table {
  #thumbnail-container {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      max-width: 50px!important;
    }
  }
}
label {
  width: 100%;
  border: 2px dashed #c8c8c8;
  text-align: center;
  padding: 50px 0;
  cursor: pointer;
  &.loading {
    cursor: not-allowed;
  }
}
</style>