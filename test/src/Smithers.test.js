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
            await smithersInstance.getInfo();
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
                await smithersInstance.getInfo();
            } catch (e) {
                expect(e).to.equal(mockError);
            }
        });
    });

    describe('getInfo', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getInfo()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getInfo()).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getInfo(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/api/json', mockConfig);
        });
    });

    describe('getJobInfo', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getJobInfo('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getJobInfo('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getJobInfo('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getJobInfo()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('startBuild', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.startBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.startBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.startBuild('jobName', mockConfig);
            expect(callerPostStub).to.be.calledWithExactly('/job/jobName/build', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.startBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getLastBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getLastBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getLastBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getLastSuccessfulBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getLastSuccessfulBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getLastSuccessfulBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastSuccessfulBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastSuccessfulBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastSuccessfulBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getLastStableBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getLastStableBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getLastStableBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastStableBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastStableBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastStableBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getLastUnsuccessfulBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getLastUnsuccessfulBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getLastUnsuccessfulBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastUnsuccessfulBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastUnsuccessfulBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastUnsuccessfulBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getLastFailedBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getLastFailedBuild('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getLastFailedBuild('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastFailedBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/lastFailedBuild/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastFailedBuild()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getSpecificBuild', () => {
        const buildNumber = 100;

        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getSpecificBuild('jobName', buildNumber)).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getSpecificBuild('jobName', buildNumber)).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getSpecificBuild('jobName', buildNumber, mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/100/api/json', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getSpecificBuild()).to.be.rejectedWith('Missing parameter: name'));

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getSpecificBuild('jobName')).to.be.rejectedWith('Missing parameter: buildNumber'));
    });

    describe('getConfigXML', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getConfigXML('jobName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getConfigXML('jobName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getConfigXML('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/job/jobName/config.xml', mockConfig);
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getConfigXML()).to.be.rejectedWith('Missing parameter: name'));
    });

    describe('getOverallLoad', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getOverallLoad()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getOverallLoad()).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getOverallLoad(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/overallLoad/api/json', mockConfig);
        });
    });

    describe('getQueue', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getQueue()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getQueue()).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getQueue(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/queue/api/json', mockConfig);
        });
    });

    describe('getView', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getView('viewName')).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getView('viewName')).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getView('viewName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly('/view/viewName/api/json', mockConfig);
        });

        it('should call Caller.get with the default view name if none provided', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getView();
            expect(callerGetStub).to.be.calledWithExactly('/view/All/api/json', undefined);
        });
    });
});
