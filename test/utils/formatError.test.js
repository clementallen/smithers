import formatError from '../../src/utils/formatError';

describe('formatError', () => {
    it('should return the expected error string', () => {
        const mockError = {
            name: 'StatusCodeError',
            statusCode: 500
        }

        const expected = 'StatusCodeError | 500';

        const actual = formatError(mockError);

        expect(actual).to.equal(expected);
    });
});
