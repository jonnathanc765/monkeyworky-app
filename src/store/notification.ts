import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';
export const notificationStore = createStore({
    state: {
        count: 0,
        notifications: [] as any[],
        paginate: { } as any,
    },
    mutations: {
        setCount(state, count) {
            state.count += count;
        },

        setPaginate(state, payload) {
            state.paginate = payload;
        },

        setNotifications(state, payload) {
            state.notifications = payload;
        },

        setNotificationsPaginate(state, payload) {
            state.notifications = state.notifications.concat(payload);
        },

        setNotification(state, payload) {
            state.notifications.unshift(payload);
        },

        updateNotification(state, payload) {
            state.notifications = state.notifications.map((res: any) => res.id !== payload.id ? res : payload);
        },

        updateNotificationAll(state, payload) {
            state.notifications = state.notifications.map((res: any) => {
                res.view = 1;
                return res;
            });
        },
    },
    actions: {

        get({ commit }, page = 1) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`/notification?page=${page}&limit=7`).then((res) => {
                    commit(page === 1 ? 'setNotifications' : 'setNotificationsPaginate', res.data.data);
                    commit('setPaginate', { meta: res.data.meta, links: res.data.links });
                    resolve(res.data.data);
                }).catch((error: any) => {
                    reject(error.response);
                });
            });
        },

        viewOne({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put(`/notification/${id}`).then((res) => {
                    commit('updateNotification', res.data.data);
                    resolve(res.data.data);
                }).catch((error: any) => {
                    reject(error.response);
                });
            });
        },

        viewAll({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put(`/notification/update/all`).then((res) => {
                    commit('updateNotificationAll', res.data.data);
                    resolve(res.data.data);
                }).catch((error: any) => {
                    reject(error.response);
                });
            });
        },
    },
});
