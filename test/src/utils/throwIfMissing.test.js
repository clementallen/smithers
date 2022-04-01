import throwIfMissing from '../../../src/utils/throwIfMissing';

describe('throwIfMissing()', () => {
    it('should return an Error object with the expected message', () => {
        expect(throwIfMissing.bind(throwIfMissing, 'param')).to.throw('Missing parameter: param');
    });
});
