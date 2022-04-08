import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const bankStore = createStore({
    state: {
        banks: [{
            bank_id: 0,
            name: '',
            owner: '',
            email: '',
            phone: '',
            dni: '',
            account_number: '',
            type: '',
        }],

        banksDestination: [
            'Ally Bank',
            'Bank of America',
            'Bank of Hawaii',
            'Bank of the West',
            'BB&T',
            'BECU',
            'Capital One',
            'Citi',
            'Citizens Bank',
            'Comerica Bank',
            'ConnectOne Bank',
            'Dollar Bank',
            'Fifth Third Bank',
            'FirstBank',
            'First Tech Federal Credit Union',
            'First Tennessee Bank',
            'First National Bank',
            'Frederick County Bank',
            'Frost Bank',
            'HomeStreet Bank',
            'JP Morgan Chase',
            'KeyBank',
            'M&T Bank',
            'MB Financial Bank',
            'Morgan Stanley',
            'PNC Bank',
            'SchoolsFirst Federal Credit Union',
            'Star One Credit Union',
            'SunTrust Bank',
            'TD Bank',
            'USAA',
            'U.S. Bank',
            'Amerant Bank',
            'Wells Fargo',
        ],

        bankDestinationBs: [
            'Banco Central de Venezuela',
            'Banco de Venezuela',
            'Banco Venezolano de Crédito',
            'Banco Agrícola de Venezuela',
            'Banco Caroní',
            'Banco Plaza',
            'Banco del Tesoro',
            'Banco Nacional de Crédito BNC',
            'Banco Activo',
            'Bancaribe',
            'Bancrecer',
            'Bancamiga',
            'Bangente',
            'Banplus',
            'Banfanb',
            'Banesco',
            'Bicentenario',
            'BOD',
            '100% Banco',
            'Del Sur Banco Universal',
            'Exterior',
            'Fondo Común BFC',
            'Mercantil',
            'Mi Banco',
            'Provincial',
            'Sofitasa',
        ],

        codeBs: {
            'Banco Central de Venezuela': '0001',
            'Banco de Venezuela': '0102',
            'Banco Venezolano de Crédito': '0104',
            'Banco Agrícola de Venezuela': '0166',
            'Banco Caroní': '0128',
            'Banco Plaza': '0138',
            'Banco del Tesoro': '0163',
            'Banco Nacional de Crédito BNC': '0191',
            'Banco Activo': '0171',
            'Bancaribe': '0114',
            'Bancrecer': '0168',
            'Bancamiga': '0172',
            'Bangente': '0146',
            'Banplus': '0174',
            'Banfanb': '0177',
            'Banesco': '0134',
            'Bicentenario': '0175',
            'BOD Banco Occidental de Descuento': '0116',
            '100% Banco': '0156',
            'Del Sur Banco Universal': '0157',
            'Exterior': '0115',
            'Fondo Común BFC': '0151',
            'Mercantil': '0105',
            'Mi Banco': '0169',
            'Provincial': '0108',
            'Sofitasa': '0137',
        } as any,
    },
    mutations: {
        setBanks(state, payload) {
            state.banks = payload;
        },

        deleteBank(state, id) {
            state.banks = state.banks.filter((res) => res.bank_id !== id);
        },
    },
    actions: {
        get({ commit }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().get('/public/bank').then((res) => {
                    commit('setBanks', res.data.data);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        post({ dispatch }, data) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post('/bank', data).then((res) => {
                    dispatch('get');
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        update({ dispatch }, { data, id }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().put(`/bank/${id}`, data).then((res) => {
                    dispatch('get');
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        delete({ commit }, id) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().delete(`/bank/${id}`).then((res) => {
                    commit('deleteBank', id);
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
