import axios from 'axios';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url, config = {}) {
        this.url = url;
        this.config = config;
        this.axiosConfig = {
            timeout: this.config.timeout || 5000,
            baseURL: this.url
        };
    }

    get(path, config = this.axiosConfig) {
        return new Promise((resolve, reject) => {
            const requestConfig = config;
            requestConfig.baseURL = this.url;
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
