import { createStore } from 'vuex';
import { SignIn } from '../core/interfaces/Auth.interface';
import { AxiosService } from '../core/services/axios.service';

const local = localStorage.getItem('_vup');

export default createStore({
    state: {
        auth: local ? JSON.parse(local) : {} as any,
        people: [] as any,
        pagination: {},
    },
    mutations: {
        setAuth(state, auth) {
            state.auth = auth;
        },

        setPeople(state, payload) {
            state.people = payload;
        },

        setPagination(state, payload) {
            state.pagination = payload;
        },
    },
    actions: {
        signIn({ commit }, data: SignIn) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post('/public/auth/signin', data).then((res: any) => {
                    localStorage.setItem('_vsr', res.data.data.api_token);
                    localStorage.setItem('_vup', JSON.stringify(res.data.data));
                    resolve(res.data.data);
                    commit('setAuth', res.data.data);
                }).catch((error: any) => {
                    reject(error.response);
                });
            });
        },

        async signUp({ }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post('/public/auth/signup', data).then((res: any) => {
                    resolve(res.data);
                    localStorage.setItem('_vsr', res.data.data.api_token);
                    localStorage.setItem('_vup', JSON.stringify(res.data.data));
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        async logOut({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post('/auth/logout').then(() => {
                    commit('setAuth', {});
                    localStorage.removeItem('_vup');
                    localStorage.removeItem('_vsr');
                    resolve(true);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        async changePassword({ }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put('/profile/password', data).then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        async changeProfile({ dispatch }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put('/profile', data).then((res) => {
                    dispatch('checkSession');
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        checkSession({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('check/token').then((res: any) => {
                    commit('setAuth', res.data.data);
                    localStorage.setItem('_vup', JSON.stringify(res.data.data));
                    resolve(res.data.data);
                }).catch((error) => {
                    commit('setAuth', {});
                    localStorage.removeItem('_vup');
                    localStorage.removeItem('_vsr');
                    reject(error);
                });
            });
        },

        getUsers({ commit }, filter) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`/people?role=${filter.role}&page=${filter.page}`).then((res: any) => {
                    commit('setPeople', res.data.data);
                    commit('setPagination', { links: res.data.links, meta: res.data.meta });
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        emailPassword({ }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`/public/forgot/password`, { email: data }).then((res: any) => {
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
        forgotPassword({ }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`public/forgot/password-reset`, data).then((res: any) => {
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },

    getters: {
        isAuth(state) {
            return state.auth.id;
        },
    },
});
