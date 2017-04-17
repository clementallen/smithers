import proxyquire from 'proxyquire';

describe('Caller', () => {
    const requestStub = sinon.stub();
    const Caller = proxyquire('../src/Caller', {
        'request-promise': requestStub
    });
    const caller = new Caller('http://example.com');

    describe('receive', () => {
        it('should resolve with the correct data', () => {
            const mockResponse = {
                mockProp: 'mockVal'
            };
            requestStub.resolves(JSON.stringify(mockResponse));

            return expect(caller.receive('/test/path')).to.eventually.eql(mockResponse);
        });

        it('should resolve if response errors', () => {
            const mockError = new Error('Unavailable');
            requestStub.rejects(mockError);

            return expect(caller.receive('/test/path')).to.be.rejectedWith(mockError);
        });
    });
});
