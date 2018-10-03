import axios from 'axios';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url, config = {}) {
        this.url = url;
        this.config = Object.assign({}, config, {
            timeout: config.timeout || 5000,
            baseURL: this.url
        });
    }

    get(path, config) {
        return this.call('GET', path, config);
    }

    post(path, config) {
        return this.call('POST', path, config);
    }

    async call(method, path, config) {
        const url = `${this.config.baseURL}${path}`;
        const requestConfig = Object.assign({}, this.config, config, {
            method, url
        });

        try {
            const response = await axios(requestConfig);
            return (response.data !== '') ? response.data : 'Request successful';
        } catch (error) {
            throw formatError(error);
        }
    }
}
