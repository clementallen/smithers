import proxyquire from 'proxyquire';

describe('Caller', () => {
    const axiosStub = sinon.stub();
    const mockPath = '/test/path';
    const mockUrl = 'http://example.com';
    const mockResponse = {
        data: {
            callerProp: 'callerVal'
        }
    };
    const mockConfig = {
        timeout: 1000,
        auth: {
            username: 'user',
            password: 'pass'
        }
    };

    const Caller = proxyquire('../src/Caller', {
        axios: axiosStub
    });

    const caller = new Caller(mockUrl);

    afterEach(() => {
        axiosStub.reset();
    });

    describe('get', () => {
        it('should resolve with the correct data', () => {
            axiosStub.resolves(mockResponse);

            return expect(caller.get(mockPath)).to.eventually.eql(mockResponse.data);
        });

        it('should resolve with a standard message if response.data is empty', () => {
            axiosStub.resolves({
                data: ''
            });

            return expect(caller.get(mockPath)).to.eventually.eql('Request successful');
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Caller Unavailable');
            axiosStub.rejects(mockError);

            return expect(caller.get(mockPath)).to.be.rejectedWith('Caller Unavailable');
        });

        it('should call axios with the instance config if no separate config provided', (done) => {
            axiosStub.resolves(mockResponse);
            caller.get(mockPath).then(() => {
                expect(axiosStub).to.be.calledWithExactly({
                    baseURL: mockUrl,
                    method: 'GET',
                    url: 'http://example.com/test/path',
                    timeout: 5000,
                    auth: false
                });
                done();
            });
        });

        it('should call axios with the individual config if provided', (done) => {
            const newMockConfig = Object.assign({}, mockConfig, {
                params: {
                    tree: 'tree'
                }
            });
            axiosStub.resolves(mockResponse);
            caller.get(mockPath, newMockConfig).then(() => {
                expect(axiosStub).to.be.calledWithExactly({
                    baseURL: mockUrl,
                    method: 'GET',
                    url: 'http://example.com/test/path',
                    timeout: 1000,
                    params: {
                        tree: 'tree'
                    },
                    auth: {
                        username: 'user',
                        password: 'pass'
                    }
                });
                done();
            });
        });
    });

    describe('post', () => {
        it('should resolve with the correct data', () => {
            axiosStub.resolves(mockResponse);

            return expect(caller.post(mockPath)).to.eventually.eql(mockResponse.data);
        });

        it('should resolve with a standard message if response.data is empty', () => {
            axiosStub.resolves({
                data: ''
            });

            return expect(caller.get(mockPath)).to.eventually.eql('Request successful');
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Caller Unavailable');
            axiosStub.rejects(mockError);

            return expect(caller.post(mockPath)).to.be.rejectedWith('Caller Unavailable');
        });

        it('should call axios with the instance config if no separate config provided', (done) => {
            axiosStub.resolves(mockResponse);
            caller.post(mockPath).then(() => {
                expect(axiosStub).to.be.calledWithExactly({
                    baseURL: mockUrl,
                    method: 'POST',
                    url: 'http://example.com/test/path',
                    timeout: 5000,
                    auth: false
                });
                done();
            });
        });

        it('should call axios with the individual config if provided', (done) => {
            const newMockConfig = Object.assign({}, mockConfig, {
                params: {
                    tree: 'tree'
                }
            });
            axiosStub.resolves(mockResponse);
            caller.post(mockPath, newMockConfig).then(() => {
                expect(axiosStub).to.be.calledWithExactly({
                    baseURL: mockUrl,
                    method: 'POST',
                    url: 'http://example.com/test/path',
                    timeout: 1000,
                    params: {
                        tree: 'tree'
                    },
                    auth: {
                        username: 'user',
                        password: 'pass'
                    }
                });
                done();
            });
        });
    });
});
