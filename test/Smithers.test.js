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

    describe('job', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.job('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.job('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.job('jobName', mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/api/json', mockConfig);
                done();
            });
        });
    });

    describe('lastBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.lastBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.lastBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.lastBuild('jobName', mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastBuild/api/json', mockConfig);
                done();
            });
        });
    });
});
