import proxyquire from 'proxyquire';

describe('Caller', () => {
    const axiosStub = sinon.stub();
    const mockResponse = {
        data: {
            mockProp: 'mockVal'
        }
    };

    const Caller = proxyquire('../src/Caller', {
        'axios': {
            get: axiosStub
        }
    });
    const caller = new Caller('http://example.com');

    describe('get', () => {
        it('should resolve with the correct data', () => {
            axiosStub.resolves(mockResponse);

            return expect(caller.get('/test/path')).to.eventually.eql(mockResponse.data);
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Unavailable')
            axiosStub.rejects(mockError);

            return expect(caller.get('/test/path')).to.be.rejectedWith('Unavailable');
        });

        it('should call axios with the expected arguments', (done) => {
            const mockConfig = {
                timeout: 1000
            };
            const callerWithConfig = new Caller('http://example.com', mockConfig);
            axiosStub.resolves(mockResponse);
            callerWithConfig.get('/test/path').then((response) => {
                expect(axiosStub).to.be.calledWith('/test/path', {
                    baseURL: 'http://example.com',
                    timeout: 1000
                });
                return done();
            });
        });
    });
});
