import 'jest';
import { Request, Response } from 'express';
import UserController from '../../src/controller/user';
import UserService from '../../src/service/user';
import httpStatus from '../../src/utils/httpStatus';
import { CustomRequest } from '../../src/types/global';

jest.mock('../../src/service/user');
jest.mock('../../src/service/subscription');
jest.mock('../../src/utils/httpStatus');

describe('UserController', () => {
    let req: Partial<CustomRequest>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { params: { id: '1' }, body: {}, decoded: { userId: 123 } };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    test('should get all users', async () => {
        const mockResult = { success: true, data: [{}] };
        (UserService.GetUser as jest.Mock).mockResolvedValue(mockResult);
        
        await UserController.Get(req as Request, res as Response);
        
        expect(UserService.GetUser).toHaveBeenCalled();
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should get user by id', async () => {
        const mockResult = { success: true, data: {} };
        (UserService.GetUserById as jest.Mock).mockResolvedValue(mockResult);
        
        await UserController.GetById(req as Request, res as Response);
        
        expect(UserService.GetUserById).toHaveBeenCalledWith(1);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should update user by id', async () => {
        const mockResult = { success: true, message: 'User Updated' };
        (UserService.UpdateUserById as jest.Mock).mockResolvedValue(mockResult);
        
        await UserController.UpdateById(req as Request, res as Response);
        
        expect(UserService.UpdateUserById).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should remove user by id', async () => {
        const mockResult = { success: true };
        (UserService.RemoveUserById as jest.Mock).mockResolvedValue(mockResult);
        
        await UserController.RemoveById(req as Request, res as Response);
        
        expect(UserService.RemoveUserById).toHaveBeenCalledWith(1);
        expect(httpStatus.NO_CONTENT).toHaveBeenCalledWith(res);
    });

});
