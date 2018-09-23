import axios from 'axios';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url, config) {
        this.url = url;
        this.config = config || {};
        this.axiosConfig = {
            timeout: this.config.timeout || 5000,
            baseURL: this.url,
            auth: this.config.auth || false,
            headers: this.config.headers || {}
        };
    }

    get(path, config) {
        return this.call('GET', path, config);
    }

    post(path, config) {
        return this.call('POST', path, config);
    }

    async call(method, path, config) {
        const requestConfig = Object.assign({}, this.axiosConfig, config);
        requestConfig.method = method;
        requestConfig.url = `${requestConfig.baseURL}${path}`;

        try {
            const response = await axios(requestConfig);
            return (response.data !== '') ? response.data : 'Request successful';
        } catch (error) {
            throw formatError(error);
        }
    }
}
