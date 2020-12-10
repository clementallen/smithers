import Smithers from '../../src/Smithers';
import Caller from '../../src/Caller';

describe('Smithers', () => {
    let sandbox;
    const mockError = new Error('Smithers Unavailable');
    const mockUrl = 'http://example.com';
    const mockResponse = {
        smithersProp: 'smithersVal',
    };
    const mockConfig = {
        timeout: 1000,
    };
    const callerGetStub = sinon.stub();
    const callerPostStub = sinon.stub();

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

    describe('constructor', () => {
        it('should set config if provided', () => {
            const instance = new Smithers(mockUrl, mockConfig);
            expect(instance.config).to.equal(mockConfig);
        });
    });

    describe('getInfo', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getInfo()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getInfo()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getInfo(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/api/json',
                mockConfig,
            );
        });
    });

    describe('getJobInfo', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getJobInfo('jobName')).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getJobInfo('jobName')).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getJobInfo('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getJobInfo.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('startBuild', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.startBuild('jobName')).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.startBuild('jobName')).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.startBuild('jobName', mockConfig);
            expect(callerPostStub).to.be.calledWithExactly(
                '/job/jobName/build',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.startBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('stopBuild', () => {
        const buildNumber = 100;

        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(
                smithers.stopBuild('jobName', buildNumber),
            ).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(
                smithers.stopBuild('jobName', buildNumber),
            ).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.stopBuild('jobName', buildNumber, mockConfig);
            expect(callerPostStub).to.be.calledWithExactly(
                '/job/jobName/100/stop',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.stopBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));

        it('should throw an error if the buildNumber parameter is not provided', () => expect(smithers.stopBuild.bind(smithers, 'jobName')).to.throw(
            'Missing parameter: buildNumber',
        ));
    });

    describe('getLastBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getLastBuild('jobName')).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getLastBuild('jobName')).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/lastBuild/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('getLastSuccessfulBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(
                smithers.getLastSuccessfulBuild('jobName'),
            ).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(
                smithers.getLastSuccessfulBuild('jobName'),
            ).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastSuccessfulBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/lastSuccessfulBuild/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastSuccessfulBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('getLastStableBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(
                smithers.getLastStableBuild('jobName'),
            ).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(
                smithers.getLastStableBuild('jobName'),
            ).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastStableBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/lastStableBuild/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastStableBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('getLastUnsuccessfulBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(
                smithers.getLastUnsuccessfulBuild('jobName'),
            ).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(
                smithers.getLastUnsuccessfulBuild('jobName'),
            ).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastUnsuccessfulBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/lastUnsuccessfulBuild/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastUnsuccessfulBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('getLastFailedBuild', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(
                smithers.getLastFailedBuild('jobName'),
            ).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(
                smithers.getLastFailedBuild('jobName'),
            ).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getLastFailedBuild('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/lastFailedBuild/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getLastFailedBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('getSpecificBuild', () => {
        const buildNumber = 100;

        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(
                smithers.getSpecificBuild('jobName', buildNumber),
            ).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(
                smithers.getSpecificBuild('jobName', buildNumber),
            ).to.be.rejectedWith(mockError.message);
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getSpecificBuild('jobName', buildNumber, mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/100/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getSpecificBuild.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));

        it('should throw an error if the buildNumber parameter is not provided', () => expect(
            smithers.getSpecificBuild.bind(smithers, 'jobName'),
        ).to.throw('Missing parameter: buildNumber'));
    });

    describe('getConfigXML', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getConfigXML('jobName')).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getConfigXML('jobName')).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getConfigXML('jobName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/job/jobName/config.xml',
                mockConfig,
            );
        });

        it('should throw an error if the name parameter is not provided', () => expect(smithers.getConfigXML.bind(smithers)).to.throw(
            'Missing parameter: name',
        ));
    });

    describe('getOverallLoad', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getOverallLoad()).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getOverallLoad()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getOverallLoad(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/overallLoad/api/json',
                mockConfig,
            );
        });
    });

    describe('getQueue', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getQueue()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getQueue()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getQueue(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/queue/api/json',
                mockConfig,
            );
        });
    });

    describe('getView', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getView('viewName')).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getView('viewName')).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getView('viewName', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/view/viewName/api/json',
                mockConfig,
            );
        });

        it('should call Caller.get with the default view name if none provided', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getView();
            expect(callerGetStub).to.be.calledWithExactly(
                '/view/All/api/json',
                undefined,
            );
        });
    });

    describe('restart', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.restart()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.restart()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.restart(mockConfig);
            expect(callerPostStub).to.be.calledWithExactly(
                '/restart',
                mockConfig,
            );
        });
    });

    describe('safeRestart', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.safeRestart()).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.safeRestart()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.safeRestart(mockConfig);
            expect(callerPostStub).to.be.calledWithExactly(
                '/safeRestart',
                mockConfig,
            );
        });
    });

    describe('startQuietDown', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.startQuietDown()).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.startQuietDown()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.startQuietDown(mockConfig);
            expect(callerPostStub).to.be.calledWithExactly(
                '/quietDown',
                mockConfig,
            );
        });
    });

    describe('stopQuietDown', () => {
        it('should resolve with Caller response', () => {
            callerPostStub.resolves(mockResponse);
            return expect(smithers.stopQuietDown()).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerPostStub.rejects(mockError);
            return expect(smithers.stopQuietDown()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerPostStub.resolves(mockResponse);
            await smithers.stopQuietDown(mockConfig);
            expect(callerPostStub).to.be.calledWithExactly(
                '/cancelQuietDown',
                mockConfig,
            );
        });
    });

    describe('getWhoAmI', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getWhoAmI()).to.eventually.eql(mockResponse);
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getWhoAmI()).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getWhoAmI(mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/whoAmI/api/json',
                mockConfig,
            );
        });
    });

    describe('getUser', () => {
        it('should resolve with Caller response', () => {
            callerGetStub.resolves(mockResponse);
            return expect(smithers.getUser('username')).to.eventually.eql(
                mockResponse,
            );
        });

        it('should reject with Caller error', () => {
            callerGetStub.rejects(mockError);
            return expect(smithers.getUser('username')).to.be.rejectedWith(
                mockError.message,
            );
        });

        it('should call Caller.get with the expected parameters', async () => {
            callerGetStub.resolves(mockResponse);
            await smithers.getUser('username', mockConfig);
            expect(callerGetStub).to.be.calledWithExactly(
                '/user/username/api/json',
                mockConfig,
            );
        });

        it('should throw an error if the user parameter is not provided', () => expect(smithers.getUser.bind(smithers)).to.throw(
            'Missing parameter: user',
        ));
    });
});
