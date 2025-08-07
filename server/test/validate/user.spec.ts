import 'jest';
import { Request, Response, NextFunction } from 'express';
import { ValidateInput } from '../../src/utils/validate';
import { CreateUserValidate } from '../../src/validate/user';
import { UserDto } from '../../src/dto/user';
import httpStatus from '../../src/utils/httpStatus';

jest.mock('../../src/utils/validate');
jest.mock('../../src/utils/httpStatus');

describe('Permission, Role, Subscription & User Validation Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    test('should validate and proceed for CreateUserValidate', async () => {
        const mockResult = { success: true, data: {} };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await CreateUserValidate(req as Request, res as Response, next);
        
        expect(ValidateInput).toHaveBeenCalledWith(UserDto, req.body);
        expect(req.body).toEqual(mockResult.data);
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid CreateUserValidate input', async () => {
        const mockResult = { success: false };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await CreateUserValidate(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, mockResult);
        expect(next).not.toHaveBeenCalled();
    });
});
