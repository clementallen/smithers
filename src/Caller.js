import axios from 'axios';
import formatError from './utils/formatError';
import crumbIssuer from './utils/crumbIssuer';

export default class Caller {
    constructor(url, config = {}) {
        this.url = url;
        this.crumb = null;
        this.crumbPending = null;
        this.config = {
            ...config,
            timeout: config.timeout || 5000,
            baseURL: this.url
        };
    }

    get(path, config) {
        return this.call('GET', path, config);
    }

    post(path, config) {
        return this.call('POST', path, config);
    }

    async call(method, path, config) {
        if (this.crumbPending) await this.crumbPending;
        if (this.config.crumbIssuer && !this.crumb) {
            // eslint-disable-next-line no-async-promise-executor
            this.crumbPending = new Promise(async (resolve) => {
                this.crumb = await crumbIssuer(this.url, this.config);
                this.config.headers = this.config.headers || {};
                this.config.headers[this.crumb.crumbRequestField] = this.crumb.crumb;
                resolve();
            });
            await this.crumbPending;
        }
        const url = `${this.config.baseURL}${path}`;
        const requestConfig = {
            ...this.config,
            ...config,
            method,
            url
        };

        try {
            const response = await axios(requestConfig);
            return response.data !== '' ? response.data : 'Request successful';
        } catch (error) {
            throw formatError(error);
        }
    }
}
