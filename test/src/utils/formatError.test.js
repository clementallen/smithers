import formatError from '../../../src/utils/formatError';

describe('formatError', () => {
    const mockError = new Error('Unavailable');
    it('should return the expected error string if response exists', () => {
        const actual = formatError({
            response: {
                status: 500,
                statusText: 'StatusCodeError',
            },
        });

        expect(actual.message).to.equal('500 | StatusCodeError');
    });

    it('should return the error object message if response does not exist', () => {
        const actual = formatError(mockError);

        expect(actual.message).to.equal(mockError.message);
    });

    it('should return an instance of Error', () => {
        const actual = formatError(mockError);

        expect(actual).to.be.instanceOf(Error);
    });
});
