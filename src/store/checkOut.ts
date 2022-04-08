import { createStore } from 'vuex';
import { AxiosService } from '../core/services/axios.service';

export const checkOut = createStore({
    state: {
        typeId: 0,
        addressId: 0,
        truncate: false,

        registerPay: {
            bankOrigin: '',
            bankDestination: '',
            reference: '',
            email: '',
            name: '',
            date: '',
            amount: 0,
            image: '',
        },
    },
    mutations: {
        setRegisterPay(state, item) {
            state.registerPay = item;
        },
        setType(state, item) {
            state.typeId = item;
        },

        setAddressId(state, item) {
            state.addressId = item;
        },

        setTruncate(state, payload) {
            state.truncate = payload;
        },
    },
    actions: {

        checkOutApi({ state }) {
            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`order`, { type: state.typeId, address: state.addressId !== 0 ? state.addressId : null, bank: state.registerPay.bankOrigin }).then((res) => {
                    resolve(res.data.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },

        payApi({ state }, id: number) {
            const formData = new FormData();
            formData.append('bank', state.registerPay.bankOrigin);
            formData.append('owner', state.registerPay.name);
            formData.append('email', state.registerPay.email);
            formData.append('date', state.registerPay.date);
            formData.append('destination', state.registerPay.bankDestination);
            formData.append('reference', state.registerPay.reference);
            formData.append('voucher', state.registerPay.image);

            return new Promise((resolve, reject) => {
                AxiosService.endPoint().post(`order/payment/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    reject(error.response);
                });
            });
        },
    },
});
