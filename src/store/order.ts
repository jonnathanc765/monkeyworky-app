import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const orderStore = createStore({
    state: {
        details: {} as any,
        orders: [] as any,
        pagination: {} as any,
    },
    mutations: {
        setDetails(state, item) {
            state.details = item;
        },

        setOrders(state, payload) {
            state.orders = payload;
        },

        setOrder(state, payload) {
            state.orders.unshift(payload);
        },

        setPagination(state, payload) {
            state.pagination = payload;
        },
    },
    actions: {

        details({ commit }, id: number) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`order/${id}`).then((res) => {
                    commit('setDetails', res.data.data);
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        tracking({ commit }, id: number) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`public/tracking/${id}`).then((res) => {
                    commit('setDetails', res.data.data);
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        getOrders({ commit }, data?) {
            let path = 'order?limit=10';
            if (data) {
                if (data.pagination) {
                    path += `&page=${data.pagination.page}`;
                }

                if (data.filter) {
                    path += `&status=${data.filter.status}`;
                }
            }
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(path).then((res) => {
                    commit('setOrders', res.data.data);
                    commit('setPagination', res.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        put({ dispatch }, { id, status }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put(`order/${id}`, { status }).then((res) => {
                    dispatch('details', id);
                    dispatch('getOrders');
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
