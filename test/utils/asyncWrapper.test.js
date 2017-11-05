import asyncWrapper from '../../src/utils/asyncWrapper';

const delay = (t = 1000) => new Promise(resolve => setTimeout(resolve, t));

class MockClass {
    constructor(login, pass) {
        this.login = login;
        this.pass = pass;
        // simulate api call for auth key
        this.init = delay().then(() => {
            this.apiKey = 'SECRET_API_KEY';
        });
    }

    action() {
        if (!this.apiKey) {
            throw new Error();
        }
    }
}

describe('asyncWrapper', () => {
    it('should wait for async constructor', () => {
        asyncWrapper(MockClass);

        const client = new MockClass('login', 'pass');
        return client.action();
    });
});
