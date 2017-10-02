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

    describe('lastSuccessfulBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.lastSuccessfulBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.lastSuccessfulBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.lastSuccessfulBuild('jobName', mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastSuccessfulBuild/api/json', mockConfig);
                done();
            });
        });
    });

    describe('lastStableBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.lastStableBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.lastStableBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.lastStableBuild('jobName', mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastStableBuild/api/json', mockConfig);
                done();
            });
        });
    });

    describe('lastUnsuccessfulBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.lastUnsuccessfulBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.lastUnsuccessfulBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.lastUnsuccessfulBuild('jobName', mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastUnsuccessfulBuild/api/json', mockConfig);
                done();
            });
        });
    });

    describe('specificBuild', () => {
        const buildNumber = 100;
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.specificBuild('jobName', buildNumber)).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.specificBuild('jobName', buildNumber)).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.specificBuild('jobName', buildNumber, mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/job/jobName/100/api/json', mockConfig);
                done();
            });
        });
    });

    describe('overallLoad', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.overallLoad()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.overallLoad()).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.overallLoad(mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/overallLoad/api/json', mockConfig);
                done();
            });
        });
    });

    describe('queue', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.queue()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.queue()).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', (done) => {
            callerGetStub.resolves(mockResponse);
            smithers.queue(mockConfig).then(() => {
                expect(callerGetStub).to.be.calledWithExactly('/queue/api/json', mockConfig);
                done();
            });
        });
    });
});
