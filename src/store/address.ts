import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const addressStore = createStore({
    state: {
        addresses: [{
            address_id: 0,
            address: '',
            comment: '',
            name: '',
            type: '',
            parish: {
                id: '',
                name: '',
                municipality: {
                    name: '',
                    id: '',
                },
                state: {
                    name: '',
                    id: '',
                },
            },
        }],
        states: [],
        municipalities: [] as any,
        parishes: [],
    },
    mutations: {
        setAddresses(state, payload) {
            state.addresses = payload;
        },

        setAddress(state, payload) {
            if (!state.addresses.find((res: any) => res.address_id === payload.address_id)) {
                state.addresses.push(payload);
            }
        },

        setStates(state, payload) {
            state.states = payload;
        },

        setMunicipalities(state, payload) {
            state.municipalities = payload;
        },

        setParishes(state, payload) {
            state.parishes = payload;
        },
    },
    actions: {
        get({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('/address').then((res) => {
                    commit('setAddresses', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        getStates({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('/public/state').then((res) => {
                    commit('setStates', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        getParishes({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`/public/municipality/${id}`).then((res) => {
                    commit('setParishes', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        getMunicipality({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`/public/state/${id}`).then((res) => {
                    commit('setMunicipalities', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        post({ commit }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post('/address', data).then((res) => {
                    commit('setAddress', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
