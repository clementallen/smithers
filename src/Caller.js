import request from 'request-promise';
import buildUrl from './utils/buildUrl';

export default class Caller {
    constructor(url) {
        this.url = url;
    }

    receive(path) {
        return new Promise((resolve, reject) => {
            const url = buildUrl(this.url, path);
            request(url)
                .then(JSON.parse)
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        });
    }
}
