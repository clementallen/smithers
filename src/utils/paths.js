export default {
    info: '/api/json',
    job: '/job/{name}/api/json',
    build: '/job/{name}/build',
    lastBuild: '/job/{name}/lastBuild/api/json',
    lastSuccessfulBuild: '/job/{name}/lastSuccessfulBuild/api/json',
    lastStableBuild: '/job/{name}/lastStableBuild/api/json',
    lastUnsuccessfulBuild: '/job/{name}/lastUnsuccessfulBuild/api/json',
    lastFailedBuild: '/job/{name}/lastFailedBuild/api/json',
    specificBuild: '/job/{name}/{buildNumber}/api/json',
    configXML: '/job/{name}/config.xml',
    overallLoad: '/overallLoad/api/json',
    queue: '/queue/api/json',
    crumbIssuer: '/crumbIssuer/api/json'
};
