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

    const Caller = proxyquire('../src/Caller', {
        axios: {
            get: axiosStub
        }
    });
    const caller = new Caller(mockUrl);

    describe('get', () => {
        it('should resolve with the correct data', () => {
            axiosStub.resolves(mockResponse);

            return expect(caller.get(mockPath)).to.eventually.eql(mockResponse.data);
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Caller Unavailable');
            axiosStub.rejects(mockError);

            return expect(caller.get(mockPath)).to.be.rejectedWith('Caller Unavailable');
        });

        it('should call axios with the instance config if no separate config provided', (done) => {
            axiosStub.resolves(mockResponse);
            caller.get(mockPath).then(() => {
                expect(axiosStub).to.be.calledWithExactly(mockPath, {
                    timeout: 5000,
                    baseURL: mockUrl,
                    withCredentials: true
                });
                done();
            });
        });

        it('should call axios with the individual config if provided', (done) => {
            const mockConfig = {
                timeout: 1000
            };
            axiosStub.resolves(mockResponse);
            caller.get(mockPath, mockConfig).then(() => {
                expect(axiosStub).to.be.calledWithExactly(mockPath, {
                    baseURL: mockUrl,
                    timeout: 1000,
                    withCredentials: true
                });
                done();
            });
        });
    });
});
