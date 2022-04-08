import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';
export const variationStore = createStore({
    state: {
        variations: [] as any,
    },
    mutations: {
        setVariations(state, item) {
            state.variations = item;
        },

    },
    actions: {
        async get({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('/variation').then((res) => {
                    commit('setVariations', res.data.data);
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
