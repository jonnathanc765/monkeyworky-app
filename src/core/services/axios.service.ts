import Axios, { AxiosResponse } from 'axios';
import { enviroment } from '../env/enviroment';
import alertBulma from '../global/alert';
import { useStore } from 'vuex';



export class AxiosService {
    public static endPoint(api = true) {

        const axios = Axios.create({
            baseURL: (api) ? enviroment.URL_API : enviroment.URL,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': `Bearer ${localStorage.getItem('_vsr')}`,
            },
        });

        axios.interceptors.response.use((response: AxiosResponse<any>) => {
            return response;
        }, ((error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    if (error.response.data.code) {
                        if (error.response.data.code === 'H0002') {
                            localStorage.removeItem('_vup');
                            localStorage.removeItem('_vsr');
                        }
                    }
                }
            }
            return Promise.reject(error);
        }));

        return axios;
    }
}
