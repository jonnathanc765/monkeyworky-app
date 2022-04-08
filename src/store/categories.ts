import alertBulma from '@/core/global/alert';
import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const test = {
    headers: {},
};

export const categoriesStore = createStore({
    state: {
        categories: [],
        subCategories: [],
        pagination: {},
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        },
        setSubCategories(state, payload) {
            state.subCategories = payload;
        },
        setPagination(state, payload) {
            state.pagination = payload;
        },
        deleteSubCategory(state, id) {
            state.subCategories = state.subCategories.filter((res: any) => res.sub_category_id !== id);
        },
        deleteCategory(state, id) {
            state.categories = state.categories.filter((res: any) => res.id !== id);
        },
    },
    actions: {
        async getSubCategories({ commit }, data?) {

            let path = '/category/sub?limit=10';
            if (data) {
                if (data.filter) {
                    path += (data.filter.category) ? `&category=${data.filter.category}` : '';
                }
                if (data.pagination) {
                    path += `&page=${data.pagination.page}`;
                }
            }
            await AxiosService.endPoint().get(path).then((res: any) => {
                commit('setSubCategories', res.data.data);
                commit('setPagination', { links: res.data.links, meta: res.data.meta });
            }).catch((error) => {
                console.log(error.response);
                alertBulma('danger', 'Error', 'No se pudieron cargar las sub categorías, por favor recargue la página');
            });
        },

        postSub({ dispatch }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`/category/sub/${data.category}`, data).then((res) => {
                    dispatch('getSubCategories');
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        updateSub({ dispatch }, { data, id }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put(`/category/sub/${id}`, data).then((res) => {
                    dispatch('getSubCategories');
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        deleteSub({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().delete(`/category/sub/${id}`).then((res) => {
                    commit('deleteSubCategory', id);
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        async getCategories({ commit }) {
            await AxiosService.endPoint().get('/public/category').then((res: any) => {
                commit('setCategories', res.data.data);
            }).catch((error) => {
                alertBulma('warning', 'Error', 'No se pudieron cargar las categories, por favor recargue la página');
            });
        },

        postCategory({ dispatch }, data) {
            console.log(data);
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`/category`, data).then((res) => {
                    dispatch('getCategories');
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        updateCategory({ dispatch }, { data, id }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`/category/${id}`, data).then((res) => {
                    dispatch('getCategories');
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        deleteCategory({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().delete(`/category/${id}`).then((res) => {
                    commit('deleteCategory', id);
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
