import axios from 'axios';
import paths from './paths';
import formatError from './formatError';

export default async (url, config) => {
    const requestUrl = `${url}${paths.crumbIssuer}`;
    try {
        const { data } = await axios.get(requestUrl, config);
        return data;
    } catch (e) {
        throw formatError(e);
    }
};
