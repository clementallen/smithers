import proxyquire from 'proxyquire';

describe('crumbIssuer', () => {
    const mockUrl = 'http://example.com';
    const mockConfig = {
        param: 'value'
    };
    const axiosGetStub = sinon.stub();

    const crumbIssuer = proxyquire('../../../src/utils/crumbIssuer', {
        axios: {
            get: axiosGetStub
        }
    });

    afterEach(() => {
        axiosGetStub.reset();
    });

    it('should call axios with the expected arguments', async () => {
        axiosGetStub.resolves({
            data: {}
        });
        await crumbIssuer(mockUrl, mockConfig);

        expect(axiosGetStub).to.have.been.calledWith('http://example.com/crumbIssuer/api/json', mockConfig);
    });

    it('should throw the expected error', () => {
        axiosGetStub.rejects({
            response: {
                status: 500,
                statusText: 'Internal Error'
            }
        });

        return expect(crumbIssuer(mockUrl, mockConfig))
            .to.eventually.be.rejectedWith('500 | Internal Error');
    });
});
