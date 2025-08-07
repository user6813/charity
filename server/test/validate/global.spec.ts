import 'jest';
import { Request, Response, NextFunction } from 'express';
import { CreateContractValidate, UpdateContractValidate } from '../../src/validate/contract';
import { ValidateInput } from '../../src/utils/validate';
import { ContractDto, UpdateContractDto } from '../../src/dto/contract';
import httpStatus from '../../src/utils/httpStatus';
import { ValidParamsId } from '../../src/validate/global';

jest.mock('../../src/utils/validate');
jest.mock('../../src/utils/httpStatus');

describe('Contract Validation Middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
    });

    test('should validate and proceed for CreateContractValidate', async () => {
        const mockResult = { success: true, data: {} };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await CreateContractValidate(req as Request, res as Response, next);
        
        expect(ValidateInput).toHaveBeenCalledWith(ContractDto, req.body);
        expect(req.body).toEqual(mockResult.data);
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid CreateContractValidate input', async () => {
        const mockResult = { success: false };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await CreateContractValidate(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, mockResult);
        expect(next).not.toHaveBeenCalled();
    });

    test('should validate and proceed for UpdateContractValidate', async () => {
        const mockResult = { success: true, data: {} };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await UpdateContractValidate(req as Request, res as Response, next);
        
        expect(ValidateInput).toHaveBeenCalledWith(UpdateContractDto, req.body);
        expect(req.body).toEqual(mockResult.data);
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid UpdateContractValidate input', async () => {
        const mockResult = { success: false };
        (ValidateInput as jest.Mock).mockResolvedValue(mockResult);
        
        await UpdateContractValidate(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, mockResult);
        expect(next).not.toHaveBeenCalled();
    });

    test('should validate integer parameter and proceed', () => {
        req.params = { id: '123' };
        const middleware = ValidParamsId('id', 'integer');
        
        middleware(req as Request, res as Response, next);
        
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid integer parameter', () => {
        req.params = { id: 'abc' };
        const middleware = ValidParamsId('id', 'integer');
        
        middleware(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, expect.objectContaining({ message: expect.stringContaining('Invalid Params Type') }));
        expect(next).not.toHaveBeenCalled();
    });

    test('should validate string parameter and proceed', () => {
        req.params = { name: 'validString' };
        const middleware = ValidParamsId('name', 'string');
        
        middleware(req as Request, res as Response, next);
        
        expect(next).toHaveBeenCalled();
    });

    test('should return BAD_REQUEST for invalid string parameter', () => {
        req.params = { name: '123' };
        const middleware = ValidParamsId('name', 'string');
        
        middleware(req as Request, res as Response, next);
        
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, expect.objectContaining({ message: expect.stringContaining('Invalid Params Type') }));
        expect(next).not.toHaveBeenCalled();
    });
});
