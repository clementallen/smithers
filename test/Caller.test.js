import proxyquire from 'proxyquire';

describe('Caller', () => {
    const axiosStub = sinon.stub();
    const Caller = proxyquire('../src/Caller', {
        'axios': {
            get: axiosStub
        }
    });
    const caller = new Caller('http://example.com');

    describe('receive', () => {
        it('should resolve with the correct data', () => {
            const mockResponse = {
                data: {
                    mockProp: 'mockVal'
                }
            };
            axiosStub.resolves(mockResponse);

            return expect(caller.receive('/test/path')).to.eventually.eql(mockResponse.data);
        });

        it('should reject if response errors', () => {
            const mockError = new Error('Unavailable')
            axiosStub.rejects(mockError);

            return expect(caller.receive('/test/path')).to.be.rejectedWith('Unavailable');
        });
    });
});
