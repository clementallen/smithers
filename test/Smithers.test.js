import Smithers from '../src/Smithers';
import Caller from '../src/Caller';

describe('Smithers', () => {
    let sandbox;
    const mockError = 'Smithers Unavailable';
    const mockResponse = {
        smithersProp: 'smithersVal'
    };
    const callerGetStub = sinon.stub();
    const smithers = new Smithers('http://example.com');

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(Caller.prototype, 'get').callsFake(callerGetStub);
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

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.info()).to.be.rejectedWith(mockError.message);
        });
    });

    describe('jobInfo', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.jobInfo('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.jobInfo('jobName')).to.be.rejectedWith(mockError.message);
        });
    });
});
