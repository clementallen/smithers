import Smithers from '../src/Smithers';
import Caller from '../src/Caller';

describe('Smithers', () => {
    let sandbox;
    const mockError = new Error('Smithers Unavailable');
    const mockUrl = 'http://example.com';
    const mockResponse = {
        smithersProp: 'smithersVal'
    };
    const mockConfig = {
        timeout: 1000
    };
    const callerGetStub = sinon.stub();
    const smithers = new Smithers(mockUrl);

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

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.info(mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/api/json', mockConfig);
                done();
            });
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

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.jobInfo('jobName', mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/api/json', mockConfig);
                done();
            });
        });
    });
});
