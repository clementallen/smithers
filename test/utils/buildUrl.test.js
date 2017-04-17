import buildUrl from '../../src/utils/buildUrl';

describe('buildUrl', () => {
    it('should return the expected url', () => {
        const url = 'http://example.com';
        const path = '/test/path';
        const fullUrl = buildUrl(url, path);

        expect(fullUrl).to.equal('http://example.com/test/path');
    });

    it('should return empty string if neither url or path are provided', () => {
        const fullUrl = buildUrl();

        expect(fullUrl).to.equal('');
    });
});
