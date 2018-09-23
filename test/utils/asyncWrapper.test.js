import asyncWrapper from '../../src/utils/asyncWrapper';

const delay = () => new Promise(resolve => setTimeout(resolve, 10));

class MockClass {
    constructor() {
        this.config = '';

        // simulate api call for config
        this.init = delay().then(() => {
            this.config = 'CONFIG VALUE';
        });
    }

    getConfig() {
        return this.config;
    }
}

describe('asyncWrapper', () => {
    it('should wait for async constructor', async () => {
        asyncWrapper(MockClass);

        const client = new MockClass();

        const key = await client.getConfig();
        expect(key).to.equal('CONFIG VALUE');
    });
});
