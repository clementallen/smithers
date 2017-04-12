import Smithers from '../src/Smithers';

describe('Smithers', () => {
    describe('buildUrl', () => {
        it('should return the expected url', () => {
            const mockUrl = 'http://example.com';
            const mockPath = '/api/json';

            const instance = new Smithers(mockUrl);

            expect(instance.buildUrl(mockPath)).to.eql(mockUrl + mockPath);
        });

        it('should return the base url if no path specified', () => {
            const mockUrl = 'http://example.com';

            const instance = new Smithers(mockUrl);

            expect(instance.buildUrl()).to.eql(mockUrl);
        });
    });
});
