import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const test = {
  headers: {},
};

export const cartStore = createStore({
  state: {
    products: [] as any,
    iva: 0,
    subtotal: 0,
    total: 0,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },

    setProduct(state, product: object) {
      state.products.push(product);
    },

    setProductFilter(state, id) {
      state.products = state.products.filter(
        (row: any) => row.variation.id !== id
      );
    },
  },
  actions: {
    addCart({}, data) {
      return new Promise((resolve, reject) => {
        AxiosService.endPoint(true)
          .post(`shopping/cart/${data.variation_id}`, data)
          .then((res) => {
            resolve(res);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },

    addCartAuth({ state }) {
      return new Promise((resolve, reject) => {
        for (const row of state.products) {
          AxiosService.endPoint(true)
            .post(`shopping/cart/${row.variation_id}`, {
              quantity: row.quantity,
            })
            .catch((error: any) => {
              reject(error.response);
            });
        }
        resolve(true);
      });
    },

    addCartLocal({ commit }, lines) {
      const storageProduct = localStorage.getItem('_shoppingCart');
      if (storageProduct) {
        const products = JSON.parse(storageProduct) as any;
        const productExist = products.find(
          (res: any) => res.variation.id === lines[0].variation.id
        ) as any;
        if (productExist) {
          productExist.quantity = lines[0].quantity;
          products.map((res: any) =>
            res.variation.id === productExist.variation.id ? productExist : res
          );
        } else {
          products.push(lines[0]);
        }
        commit('setProducts', products);
        localStorage.setItem('_shoppingCart', JSON.stringify(products));
      } else {
        commit('setProducts', lines);
        localStorage.setItem('_shoppingCart', JSON.stringify(lines));
      }
    },

    getCartLocal({ commit }) {
      const storageProduct = localStorage.getItem('_shoppingCart');
      if (storageProduct) {
        commit('setProducts', JSON.parse(storageProduct));
      }
    },

    getCartApi({ commit }) {
      return new Promise((resolve, reject) => {
        AxiosService.endPoint(true)
          .get('shopping/cart')
          .then((res: any) => {
            commit('setProducts', res.data.data);
            resolve(res.data.data);
          })
          .catch((error: any) => {
            reject(error.response);
          });
      });
    },

    deleteCartApi({ commit }, object) {
      return new Promise((resolve, reject) => {
        AxiosService.endPoint(true)
          .delete(`/shopping/cart/${object.id}`)
          .then((res: any) => {
            commit('setProductFilter', object.variationId);
            resolve(res.data);
          })
          .catch((error) => {
            reject(error.response);
          });
      });
    },

    deleteCartLocal({ commit }, id) {
      commit('setProductFilter', id);
      const storageProduct = localStorage.getItem('_shoppingCart');
      if (storageProduct) {
        const products = JSON.parse(storageProduct) as any;
        if (products.length === 1) {
          localStorage.removeItem('_shoppingCart');
        } else {
          localStorage.setItem(
            '_shoppingCart',
            JSON.stringify(
              products.filter((row: any) => row.variation.id !== id)
            )
          );
        }
      }
    },

    values({ state }) {
      state.total = 0;
      state.subtotal = 0;
      for (const row of state.products) {
        state.subtotal +=
          parseFloat(row.variation.price) * Number(row.quantity);
      }
      state.iva = state.subtotal * 0.16;
      state.total = state.iva + state.subtotal;
    },
  },
  getters: {},
});
