import axios from 'axios';
import formatError from './utils/formatError';
import crumbIssuer from './utils/crumbIssuer';

export default class Caller {
    constructor(url, config = {}) {
        this.url = url;
        this.crumb = null;
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
        console.log('### CONFIG', this.config);
        console.log('### PREQUEST CRUMB', this.crumb);
        if (this.config.crumbIssuer && !this.crumb) {
            try {
                console.log('### ISSUING CRUMB');
                this.crumb = await crumbIssuer(this.url, this.config);
                console.log('### THIS CRUMB', this.crumb);
                this.config.headers = this.config.headers || {};
                this.config.headers[this.crumb.crumbRequestField] = this.crumb.crumb;
            } catch (e) {
                throw e;
            }
        }
        const url = `${this.config.baseURL}${path}`;
        const requestConfig = {
            ...this.config,
            ...config,
            method,
            url
        };

        console.log(requestConfig);

        try {
            const response = await axios(requestConfig);
            return response.data !== '' ? response.data : 'Request successful';
        } catch (error) {
            throw formatError(error);
        }
    }
}
