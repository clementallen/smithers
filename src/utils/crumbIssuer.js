import axios from 'axios';
import paths from './paths';
import formatError from './formatError';

export default (url, config) => new Promise((resolve, reject) => {
    const requestUrl = `${url}${paths.crumbIssuer}`;
    axios
        .get(requestUrl, config)
        .then(({ data }) => {
            resolve(data);
        })
        .catch((error) => {
            reject(formatError(error));
        });
});
