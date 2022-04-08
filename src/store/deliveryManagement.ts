import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const deliveryManagementStore = createStore({
    state: {
        types: [] as any,
    },
    mutations: {
        setTypes(state, payload) {
            state.types = payload;
        },
    },
    actions: {

        get({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('public/delivery/management').then((res) => {
                    commit('setTypes', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
