import formatError from '../../src/utils/formatError';

describe('formatError', () => {
    it('should return the expected error string if response exists', () => {
        const mockError = {
            response: {
                status: 500,
                statusText: 'StatusCodeError'
            }
        };

        const expected = '500 | StatusCodeError';

        const actual = formatError(mockError);

        expect(actual).to.equal(`Error: ${expected}`);
    });

    it('should return the error object message if response does not exist', () => {
        const mockMessage = 'Unavailable';
        const mockError = new Error(mockMessage);

        const actual = formatError(mockError);

        expect(actual).to.equal(`Error: ${mockMessage}`);
    });
});
