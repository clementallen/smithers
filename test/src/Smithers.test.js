import proxyquire from 'proxyquire';
import Caller from '../../src/Caller';

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
    const callerPostStub = sinon.stub();
    const crumbIssuerStub = sinon.stub();

    const Smithers = proxyquire('../../src/Smithers', {
        './utils/crumbIssuer': crumbIssuerStub
    });
    const smithers = new Smithers(mockUrl);

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Caller.prototype, 'get').callsFake(callerGetStub);
        sandbox.stub(Caller.prototype, 'post').callsFake(callerPostStub);
    });

    afterEach(() => {
        callerGetStub.reset();
        callerPostStub.reset();
        sandbox.restore();
    });

    describe('init', () => {
        afterEach(() => {
            crumbIssuerStub.reset();
        });

        it('should set the crumb details in the instance config', async () => {
            crumbIssuerStub.resolves({
                crumb: 'abcd1234',
                crumbRequestField: 'crumb-field'
            });
            const smithersInstance = new Smithers(mockUrl, {
                crumbIssuer: true
            });
            await smithersInstance.info();
            expect(smithersInstance.config).to.eql({
                crumbIssuer: true,
                headers: {
                    'crumb-field': 'abcd1234'
                }
            });
        });

        it('should handle crumb errors', async () => {
            crumbIssuerStub.rejects(mockError);
            try {
                const smithersInstance = new Smithers(mockUrl, {
                    crumbIssuer: true
                });
                await smithersInstance.info();
            } catch (e) {
                expect(e).to.equal(mockError);
            }
        });
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.info(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/api/json', mockConfig);
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.job('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.job()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('build', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.build('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.build('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.build('jobName', mockConfig);
            expect(callerPostStub).to.be.calledWithExactly('/job/jobName/build', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.build()).to.be.rejectedWith('Missing parameter: name'));
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.lastBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.lastBuild()).to.be.rejectedWith('Missing parameter: name'));
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.lastSuccessfulBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastSuccessfulBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.lastSuccessfulBuild()).to.be.rejectedWith('Missing parameter: name'));
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.lastStableBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastStableBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.lastStableBuild()).to.be.rejectedWith('Missing parameter: name'));
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.lastUnsuccessfulBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastUnsuccessfulBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.lastUnsuccessfulBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('lastFailedBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.lastFailedBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.lastFailedBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.lastFailedBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastFailedBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.lastFailedBuild()).to.be.rejectedWith('Missing parameter: name'));
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.specificBuild('jobName', buildNumber, mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/100/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.specificBuild()).to.be.rejectedWith('Missing parameter: name'));

        it('should throw an error if the name parameter is not provided', () => expect(smithers.specificBuild('jobName')).to.be.rejectedWith('Missing parameter: buildNumber'));
    });

    describe('configXML', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.configXML('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.configXML('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.configXML('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/config.xml', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.configXML()).to.be.rejectedWith('Missing parameter: name'));
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.overallLoad(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/overallLoad/api/json', mockConfig);
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

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.queue(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/queue/api/json', mockConfig);
        });
    });
});
