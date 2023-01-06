import { createStore } from 'vuex';
import alertBulma from '../core/global/alert';
import { AxiosService } from '../core/services/axios.service';

export const productStore = createStore({
  state: {
    products: [] as any,
    pagination: {} as any,
    productsOriginal: [],
    response: false,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    setPagination(state, payload) {
      state.pagination = payload;
    },

    setResponse(state, status) {
      state.response = status;
    },

    deleteProduct(state, id) {
      state.products = state.products.filter((res: any) => res.id !== id);
    },

    addOneProduct(state, payload) {
      state.products.push(payload);
    },
  },
  actions: {
    async addProduct({ commit }, data) {
      return new Promise((resolve, reject) => {
        AxiosService.endPoint()
          .post('/product', data)
          .then((res) => {
            commit('addOneProduct', res.data.data);
            resolve(res.data.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    async put({ dispatch }, { data, id }) {
      return new Promise((resolve, reject) => {
        AxiosService.endPoint()
          .post(`/product/${id}`, data)
          .then((res) => {
            dispatch('getProducts');
            resolve(res.data.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    async getProducts({ commit }, data?) {
      let path = 'public/products?limit=20';
      if (data) {
        if (data.filter) {
          path += data.filter.name
            ? `&name=${data.filter.name}`
            : data.filter.category
            ? `&category=${data.filter.category}`
            : `&subCategory=${data.filter.subCategory}`;
        }

        if (data.pagination) {
          path += `&page=${data.pagination.page}`;
        }
      }

      await AxiosService.endPoint()
        .get(path)
        .then(async (res) => {
          const products = res.data.data;
          commit('setProducts', products);
          commit('setPagination', res.data);
          commit('setResponse', true);
        })
        .catch((error: any) => {
          commit('setResponse', true);
          console.log(error);
          alertBulma(
            'warning',
            'Error',
            'Hubo un error a la hora de cargar los productos, por favor recarga la página.',
            { label: 'Está bien' }
          );
        });
    },

    delete({ commit }, id) {
      return new Promise((resolve, reject) => {
        AxiosService.endPoint()
          .delete(`/product/${id}`)
          .then((res) => {
            commit('deleteProduct', id);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },
  },
  getters: {},
});
