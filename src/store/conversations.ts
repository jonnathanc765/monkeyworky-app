import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';
export const conversationsStore = createStore({
    state: {
        conversations: [] as any,
        messages: [] as any,
        paginate: 1,
        idConversation: 0,
        usersActive: [] as any[],
    },
    mutations: {
        setConversations(state, payload) {
            state.conversations = payload;
        },
        setConversation(state, payload) {
            if (!state.conversations.find((res: any) => res.id === payload.id)) {
                state.conversations.push(payload);
            }
        },
        setSockketConversation(state, payload) {
            if (!state.conversations.find((res: any) => res.id === payload.id)) {
                state.conversations.push(payload);
            } else {
                state.conversations = state.conversations.filter((res: any) => res.id !== payload.id);
                state.conversations.unshift(payload);
            }
        },
        setUsersActive(state, payload) {
            state.usersActive = payload;
        },
        setUserActive(state, payload) {
            state.usersActive.push(payload);
        },
        deleteUserActive(state, payload) {
            state.usersActive = state.usersActive.filter((res) => res.id !== payload.id);
        },
        setMessages(state, payload) {
            state.messages = payload;
        },
        setMessage(state, payload) {
            state.messages.push(payload);
        },
        setSocketMessage(state, payload) {
            if (state.idConversation > 0 && state.idConversation === payload.conversation.id) {
                state.messages.push(payload.message);
            }
        },
        setIdConversation(state, id) {
            state.idConversation = id;
        },

        setPaginate(state, payload) {
            state.paginate = payload;
        },
    },
    actions: {

        /* CONVERSATION */
        getConversations({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('/conversation').then((res: any) => {
                    commit('setConversations', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    commit('setConversations', []);
                    reject(error);
                });
            });
        },

        postConversation({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`/conversation/${id}`).then((res: any) => {
                    commit('setConversation', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },

        /* MESSAGES */

        getMessages({ commit, state }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get(`/conversation/${id}?limit=20&page=${state.paginate}`).then((res: any) => {
                    if (state.messages.length === 0) {
                        commit('setMessages', res.data.data);
                        commit('setPaginate', 2);

                    } else {
                        if (res.data.data.length > 0) {
                            state.messages = res.data.data.concat(state.messages);
                            commit('setPaginate', state.paginate + 1);
                        }
                    }

                    resolve(res.data.data);
                }).catch((error) => {
                    commit('setMessages', []);
                    reject(error);
                });
            });
        },

        postMessage({ commit }, { id, data }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`/conversation/message/${id}`, data).then((res: any) => {
                    commit('setMessage', res.data.data.message);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error);
                });
            });
        },
    },
});
