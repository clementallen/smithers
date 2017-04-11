import smithers from '../src';

describe('smithers', () => {
    it('should return the expected value', () => {
        const expected = 'OK';
        const actual = smithers();

        expect(actual).to.equal(expected);
    });
});
