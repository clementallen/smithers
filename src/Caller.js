import axios from 'axios';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url, config = {}) {
        this.url = url;
        this.config = config;
        this.axiosConfig = {
            timeout: this.config.timeout || 5000,
            baseURL: this.url
        }
    }

    receive(path) {
        return new Promise((resolve, reject) => {
            axios.get(path, this.axiosConfig)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(formatError(error));
                })
        });
    }
}
