import proxyquire from 'proxyquire';

describe('Caller', () => {
    const axiosGetStub = sinon.stub();
    const axiosPostStub = sinon.stub();
    const mockPath = '/test/path';
    const mockUrl = 'http://example.com';
    const mockResponse = {
        data: {
            callerProp: 'callerVal'
        }
    };

    const Caller = proxyquire('../src/Caller', {
        axios: {
            get: axiosGetStub,
            post: axiosPostStub
        }
    });

    const caller = new Caller(mockUrl);

    afterEach(() => {
        axiosGetStub.reset();
        axiosPostStub.reset();
    });

    describe('get', () => {
        it('should resolve with the correct data', () => {
            axiosGetStub.resolves(mockResponse);

            return expect(caller.get(mockPath)).to.eventually.eql(mockResponse.data);
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Caller Unavailable');
            axiosGetStub.rejects(mockError);

            return expect(caller.get(mockPath)).to.be.rejectedWith('Caller Unavailable');
        });

        it('should call axios with the instance config if no separate config provided', (done) => {
            axiosGetStub.resolves(mockResponse);
            caller.get(mockPath).then(() => {
                expect(axiosGetStub).to.be.calledWithExactly(mockPath, {
                    timeout: 5000,
                    baseURL: mockUrl,
                    auth: false
                });
                done();
            });
        });

        it('should call axios with the individual config if provided', (done) => {
            const mockConfig = {
                timeout: 1000,
                auth: {
                    username: 'user',
                    password: 'pass'
                }
            };
            axiosGetStub.resolves(mockResponse);
            caller.get(mockPath, mockConfig).then(() => {
                expect(axiosGetStub).to.be.calledWithExactly(mockPath, {
                    baseURL: mockUrl,
                    timeout: 1000,
                    auth: {
                        username: 'user',
                        password: 'pass'
                    }
                });
                done();
            });
        });

        describe('post', () => {
            it('should resolve with the correct data', () => {
                axiosPostStub.resolves(mockResponse);

                return expect(caller.post(mockPath)).to.eventually.eql(mockResponse.data);
            });

            it('should reject if response errors', () => {
                const mockError = new Error('Caller Unavailable');
                axiosPostStub.rejects(mockError);

                return expect(caller.post(mockPath)).to.be.rejectedWith('Caller Unavailable');
            });

            it('should call axios with the instance config if no separate config provided', (done) => {
                axiosPostStub.resolves(mockResponse);
                caller.post(mockPath).then(() => {
                    expect(axiosPostStub).to.be.calledWithExactly(mockPath, {
                        timeout: 5000,
                        baseURL: mockUrl,
                        auth: false
                    });
                    done();
                });
            });

            it('should call axios with the individual config if provided', (done) => {
                const mockConfig = {
                    timeout: 1000,
                    auth: {
                        username: 'user',
                        password: 'pass'
                    }
                };
                axiosPostStub.resolves(mockResponse);
                caller.post(mockPath, mockConfig).then(() => {
                    expect(axiosPostStub).to.be.calledWithExactly(mockPath, {
                        baseURL: mockUrl,
                        timeout: 1000,
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
});
