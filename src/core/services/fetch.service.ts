import { enviroment } from '../env/enviroment';

export class FetchService {

    public static getApi(URL: string): Promise<any> {
        return fetch(`${enviroment.URL}${URL}`, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
    }

    public static postUrl(URL: string, body: any): Promise<any> {

        return fetch(`${enviroment.URL}${URL}`, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(body),
        });
    }
}
