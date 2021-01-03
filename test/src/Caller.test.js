import proxyquire from 'proxyquire';

describe('Caller', () => {
    const axiosStub = sinon.stub();
    const crumbIssuerStub = sinon.stub();
    const mockPath = '/test/path';
    const mockUrl = 'http://example.com';
    const mockResponse = {
        data: {
            callerProp: 'callerVal',
        },
    };
    const mockConfig = {
        timeout: 1000,
        auth: {
            username: 'user',
            password: 'pass',
        },
        maxRedirects: 3,
    };

    const Caller = proxyquire('../../src/Caller', {
        axios: axiosStub,
        './utils/crumbIssuer': crumbIssuerStub,
    });

    const caller = new Caller(mockUrl);

    afterEach(() => {
        axiosStub.reset();
        crumbIssuerStub.reset();
    });

    describe('get', () => {
        it('should resolve with the correct data', () => {
            axiosStub.resolves(mockResponse);

            return expect(caller.get(mockPath)).to.eventually.eql(
                mockResponse.data,
            );
        });

        it('should resolve with a standard message if response.data is empty', () => {
            axiosStub.resolves({
                data: '',
            });

            return expect(caller.get(mockPath)).to.eventually.eql(
                'Request successful',
            );
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Caller Unavailable');
            axiosStub.rejects(mockError);

            return expect(caller.get(mockPath)).to.be.rejectedWith(
                'Caller Unavailable',
            );
        });

        it('should call axios with the instance config if no separate config provided', async () => {
            const newCaller = new Caller(mockUrl, {
                maxRedirects: 2,
            });
            axiosStub.resolves(mockResponse);
            await newCaller.get(mockPath);
            expect(axiosStub).to.be.calledWithExactly({
                baseURL: mockUrl,
                method: 'GET',
                url: 'http://example.com/test/path',
                timeout: 5000,
                maxRedirects: 2,
            });
        });

        it('should call axios with the individual config if provided', async () => {
            const newMockConfig = {
                ...mockConfig,
                params: {
                    tree: 'tree',
                },
            };
            axiosStub.resolves(mockResponse);
            await caller.get(mockPath, newMockConfig);
            expect(axiosStub).to.be.calledWithExactly({
                baseURL: mockUrl,
                method: 'GET',
                url: 'http://example.com/test/path',
                timeout: 1000,
                params: {
                    tree: 'tree',
                },
                auth: {
                    username: 'user',
                    password: 'pass',
                },
                maxRedirects: 3,
            });
        });
    });

    describe('post', () => {
        it('should resolve with the correct data', () => {
            axiosStub.resolves(mockResponse);

            return expect(caller.post(mockPath)).to.eventually.eql(
                mockResponse.data,
            );
        });

        it('should resolve with a standard message if response.data is empty', () => {
            axiosStub.resolves({
                data: '',
            });

            return expect(caller.get(mockPath)).to.eventually.eql(
                'Request successful',
            );
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Caller Unavailable');
            axiosStub.rejects(mockError);

            return expect(caller.post(mockPath)).to.be.rejectedWith(
                'Caller Unavailable',
            );
        });

        it('should call axios with the instance config if no separate config provided', async () => {
            const newCaller = new Caller(mockUrl, {
                maxRedirects: 2,
            });
            axiosStub.resolves(mockResponse);
            await newCaller.post(mockPath);
            expect(axiosStub).to.be.calledWithExactly({
                baseURL: mockUrl,
                method: 'POST',
                url: 'http://example.com/test/path',
                timeout: 5000,
                maxRedirects: 2,
            });
        });

        it('should call axios with the individual config if provided', async () => {
            const newMockConfig = {
                ...mockConfig,
                params: {
                    tree: 'tree',
                },
            };
            axiosStub.resolves(mockResponse);
            await caller.post(mockPath, newMockConfig);
            expect(axiosStub).to.be.calledWithExactly({
                baseURL: mockUrl,
                method: 'POST',
                url: 'http://example.com/test/path',
                timeout: 1000,
                params: {
                    tree: 'tree',
                },
                auth: {
                    username: 'user',
                    password: 'pass',
                },
                maxRedirects: 3,
            });
        });
    });

    describe('crumb issuer', () => {
        it('should wait for the crumb issue request and set headers accordingly', async () => {
            const newCaller = new Caller(mockUrl, {
                crumbIssuer: true,
            });
            crumbIssuerStub.resolves({
                crumbRequestField: 'crumbRequestField',
                crumb: 'crumb',
            });
            axiosStub.resolves({
                data: {},
            });
            await newCaller.post(mockPath);
            expect(axiosStub).to.be.calledWithExactly({
                baseURL: mockUrl,
                method: 'POST',
                url: 'http://example.com/test/path',
                timeout: 5000,
                crumbIssuer: true,
                headers: {
                    crumbRequestField: 'crumb',
                },
            });
        });

        it('should only call the crumbissuer once when multiple requests are made', () => {
            const newCaller = new Caller(mockUrl, {
                crumbIssuer: true,
            });
            crumbIssuerStub.resolves({
                crumbRequestField: 'crumbRequestField',
                crumb: 'crumb',
            });
            axiosStub.resolves({
                data: {},
            });
            newCaller.post(mockPath);
            newCaller.post(mockPath);
            expect(crumbIssuerStub).to.be.calledOnce;
        });
    });
});
