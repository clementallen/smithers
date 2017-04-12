export default class Smithers {
    constructor(url, config = {}) {
        this.url = url;
        this.config = config;
    }

    buildUrl(path = '') {
        return this.url + path;
    }
}
