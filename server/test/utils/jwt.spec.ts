import 'jest';
import jwt from 'jsonwebtoken';
import { GenerateToken, TokenVerify } from '../../src/utils/jwt';

describe('JWT Utility Functions', () => {
    const mockPayload = { userId: 1, roleId: 2 };
    const mockToken = 'mockToken';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should generate token successfully', () => {
        jest.spyOn(jwt, 'sign').mockImplementation(() => mockToken as unknown as never);
        
        const result = GenerateToken(mockPayload);
        
        expect(jwt.sign).toHaveBeenCalledWith(mockPayload, expect.any(String));
        expect(result).toEqual({ success: true, data: mockToken });
    });

    test('should return error when token generation fails', () => {
        jest.spyOn(jwt, 'sign').mockImplementation(() => { throw new Error('Token error'); });
        
        const result = GenerateToken(mockPayload);
        
        expect(result.success).toBe(false);
        expect(result.message).toBe('Error while Generating Token');
    });

    test('should verify token successfully', () => {
        jest.spyOn(jwt, 'decode').mockReturnValue(mockPayload);
        
        const result = TokenVerify(mockToken);
        
        expect(jwt.decode).toHaveBeenCalledWith(mockToken);
        expect(result).toEqual({ success: true, data: mockPayload });
    });

    test('should return error when token verification fails', () => {
        jest.spyOn(jwt, 'decode').mockImplementation(() => { throw new Error('Verification error'); });
        
        const result = TokenVerify(mockToken);
        
        expect(result.success).toBe(false);
        expect(result.message).toBe('Error while Verifing Token');
    });
});
