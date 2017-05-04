import createPath from '../../src/utils/createPath';

describe('createPath', () => {
    it('should return plain string if no changes required', () => {
        const mockTemplate = '/mock/path';
        const result = createPath(mockTemplate);

        expect(result).to.equal(mockTemplate);
    });

    it('should build string from object', () => {
        const mockTemplate = '/path/{type}/with/extra/{param}/in';
        const values = {
            type: 'info',
            param: 'value'
        };
        const result = createPath(mockTemplate, values);

        expect(result).to.equal('/path/info/with/extra/value/in');
    });
});
