import 'jest';
import { Request, Response, NextFunction } from 'express';
import { ValidateInput } from '../../src/utils/validate';
import { CreatePermissionValidate, UpdatePermissionValidate } from '../../src/validate/permission';
import { PermissionDto, UpdatePermissionDto } from '../../src/dto/permission';
import httpStatus from '../../src/utils/httpStatus';

jest.mock('../../src/utils/validate');
jest.mock('../../src/utils/httpStatus');

describe('Permission Validation Middleware', () => {
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

    test('should validate and proceed for CreatePermissionValidate', async () => {
        const mockResult = { success: true, data: {} };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await CreatePermissionValidate(req as Request, res as Response, next);
        
        expect(ValidateInput).toHaveBeenCalledWith(PermissionDto, req.body);
        expect(req.body).toEqual(mockResult.data);
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid CreatePermissionValidate input', async () => {
        const mockResult = { success: false };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await CreatePermissionValidate(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, mockResult);
        expect(next).not.toHaveBeenCalled();
    });

    test('should validate and proceed for UpdatePermissionValidate', async () => {
        const mockResult = { success: true, data: {} };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await UpdatePermissionValidate(req as Request, res as Response, next);
        
        expect(ValidateInput).toHaveBeenCalledWith(UpdatePermissionDto, req.body);
        expect(req.body).toEqual(mockResult.data);
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid UpdatePermissionValidate input', async () => {
        const mockResult = { success: false };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await UpdatePermissionValidate(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, mockResult);
        expect(next).not.toHaveBeenCalled();
    });
});
