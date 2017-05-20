import axios from 'axios';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};
        this.axiosConfig = {
            timeout: this.config.timeout || 5000,
            baseURL: this.url,
            withCredentials: true
        };
    }

    get(path, config = this.axiosConfig) {
        return new Promise((resolve, reject) => {
            const requestConfig = config;
            requestConfig.baseURL = this.axiosConfig.baseURL;
            requestConfig.withCredentials = this.axiosConfig.withCredentials;

            axios.get(path, requestConfig)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(formatError(error));
                });
        });
    }
}
