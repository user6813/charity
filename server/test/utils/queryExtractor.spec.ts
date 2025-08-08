import 'jest';
import QueryExtractor from '../../src/utils/queryExtractor';

jest.mock('../../src/utils/httpStatus');

describe('QueryExtractor Utility Function', () => {
    test('should extract query parameters correctly', () => {
        const query = { page: 2, limit: 5, fields: 'id,name,email' };
        const result = QueryExtractor(query);
        
        expect(result).toEqual({
            attributes: ['id', 'name', 'email'],
            offset: 5,
            limit: 5,
        });
    });

    test('should return default values when no parameters are provided', () => {
        const result = QueryExtractor({});
        
        expect(result).toEqual({
            attributes: [''],
            offset: 0,
            limit: 10,
        });
    });

    test('should trim fields correctly', () => {
        const query = { fields: ' id , name , email ' };
        const result = QueryExtractor(query);
        
        expect(result.attributes).toEqual(['id', 'name', 'email']);
    });
});
