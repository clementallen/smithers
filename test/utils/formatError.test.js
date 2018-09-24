import formatError from '../../src/utils/formatError';

describe('formatError', () => {
    it('should return the expected error string if response exists', () => {
        const mockError = {
            response: {
                status: 500,
                statusText: 'StatusCodeError'
            }
        };

        const expected = new Error('500 | StatusCodeError');

        const actual = formatError(mockError);

        expect(actual.message).to.equal(expected.message);
    });

    it('should return the error object message if response does not exist', () => {
        const mockError = new Error('Unavailable');

        const actual = formatError(mockError);

        expect(actual.message).to.equal(mockError.message);
    });

    it('should return an instance of Error', () => {
        const mockError = new Error('Unavailable');

        const actual = formatError(mockError);

        expect(actual).to.be.instanceOf(Error);
    });
});
