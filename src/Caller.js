import axios from 'axios';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};
        this.axiosConfig = {
            timeout: this.config.timeout || 5000,
            baseURL: this.url,
            auth: this.config.auth || false
        };
    }

    get(path, config) {
        return this.call('GET', path, config);
    }

    post(path, config) {
        return this.call('POST', path, config);
    }

    call(method, path, config) {
        return new Promise((resolve, reject) => {
            const requestConfig = Object.assign({}, this.axiosConfig, config);
            requestConfig.method = method;
            requestConfig.url = `${requestConfig.baseURL}${path}`;

            axios(requestConfig)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(formatError(error));
                });
        });
    }
}
