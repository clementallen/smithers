export default {
    getInfo: '/api/json',
    getJobInfo: '/job/{name}/api/json',
    startBuild: '/job/{name}/build',
    getLastBuild: '/job/{name}/lastBuild/api/json',
    getLastSuccessfulBuild: '/job/{name}/lastSuccessfulBuild/api/json',
    getLastStableBuild: '/job/{name}/lastStableBuild/api/json',
    getLastUnsuccessfulBuild: '/job/{name}/lastUnsuccessfulBuild/api/json',
    getLastFailedBuild: '/job/{name}/lastFailedBuild/api/json',
    getSpecificBuild: '/job/{name}/{buildNumber}/api/json',
    getConfigXML: '/job/{name}/config.xml',
    getOverallLoad: '/overallLoad/api/json',
    getQueue: '/queue/api/json',
    crumbIssuer: '/crumbIssuer/api/json'
};
