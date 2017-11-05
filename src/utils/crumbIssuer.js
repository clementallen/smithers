import axios from 'axios';
import { crumbIssuer } from './paths';
import formatError from './formatError';

export default async (url, config) => {
    const requestUrl = `${url}${crumbIssuer}`;
    try {
        const response = await axios.get(requestUrl, config);
        return response.data;
    } catch (error) {
        throw formatError(error);
    }
};
