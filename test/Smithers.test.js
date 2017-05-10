import Smithers from '../src/Smithers';
import Caller from '../src/Caller';

describe('Smithers', () => {
    let sandbox;
    const mockError = 'Unavailable';
    const mockResponse = {
        mockProp: 'mockVal'
    };
    const callerGetStub = sinon.stub();

    const smithers = new Smithers('http://example.com');

    before(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(Caller.prototype, 'get', callerGetStub);
    });

    afterEach(() => {
        callerGetStub.reset();
        sandbox.restore();
    });

    describe('info', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.info()).to.eventually.eql(mockResponse);
        });

        xit('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.info()).to.be.rejectedWith(mockError);
        });
    });

    describe('jobInfo', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.jobInfo('jobName')).to.eventually.eql(mockResponse);
        });

        xit('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.info()).to.be.rejectedWith(mockError);
        });
    });
});
