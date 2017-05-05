import axios from 'axios';
import buildUrl from './utils/buildUrl';
import formatError from './utils/formatError';

export default class Caller {
    constructor(url) {
        this.url = url;
    }

    receive(path) {
        return new Promise((resolve, reject) => {
            const url = buildUrl(this.url, path);
            axios.get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(formatError(error));
                })
        });
    }
}
