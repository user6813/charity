import 'jest';
import { Request, Response } from 'express';
import AuthController from '../../src/controller/auth';
import AuthService from '../../src/service/auth';
import httpStatus from '../../src/utils/httpStatus';

jest.mock('../../src/service/auth');
jest.mock('../../src/utils/httpStatus');

describe('AuthController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should login successfully', async () => {
        const mockResult = { success: true, token: 'mockToken' };
        (AuthService.Login as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Login(req as Request, res as Response);
        
        expect(AuthService.Login).toHaveBeenCalledWith(req.body);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 when login fails', async () => {
        const mockResult = { success: false, message: 'User not found' };
        (AuthService.Login as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Login(req as Request, res as Response);
        
        expect(AuthService.Login).toHaveBeenCalledWith(req.body);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should signup successfully', async () => {
        const mockResult = { success: true, user: {} };
        (AuthService.Signup as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Signup(req as Request, res as Response);
        
        expect(AuthService.Signup).toHaveBeenCalledWith(req.body);
        expect(httpStatus.CREATED).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 400 when signup fails', async () => {
        const mockResult = { success: false, message: 'Invalid input' };
        (AuthService.Signup as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Signup(req as Request, res as Response);
        
        expect(AuthService.Signup).toHaveBeenCalledWith(req.body);
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, mockResult);
    });

    test('should logout successfully', async () => {
        const mockResult = { success: true };
        (AuthService.Logout as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Logout(req as Request, res as Response);
        
        expect(AuthService.Logout).toHaveBeenCalledWith({ userId: 1 });
        expect(httpStatus.OK).toHaveBeenCalledWith(res, { message: 'Successfully logged out.' });
    });

    test('should return 401 when logout fails', async () => {
        const mockResult = { success: false };
        (AuthService.Logout as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Logout(req as Request, res as Response);
        
        expect(AuthService.Logout).toHaveBeenCalledWith({ userId: 1 });
        expect(httpStatus.UNAUTHORIZED).toHaveBeenCalledWith(res, { message: 'Failed to log out, please try again.' });
    });

    test('should return authenticated user', async () => {
        const mockResult = { success: true, user: {} };
        (AuthService.Me as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Me(req as Request, res as Response);
        
        expect(AuthService.Me).toHaveBeenCalledWith({ userId: 1 });
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 401 when not authenticated', async () => {
        const mockResult = { success: false };
        (AuthService.Me as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.Me(req as Request, res as Response);
        
        expect(AuthService.Me).toHaveBeenCalledWith({ userId: 1 });
        expect(httpStatus.UNAUTHORIZED).toHaveBeenCalledWith(res, { message: 'Not authenticated.' });
    });

    test('should reset password', async () => {
        const mockResult = { success: true };
        (AuthService.PasswordReset as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.PasswordReset(req as Request, res as Response);
        
        expect(AuthService.PasswordReset).toHaveBeenCalledWith({ userId: 1 });
        expect(httpStatus.OK).toHaveBeenCalledWith(res, { message: 'Password reset link sent.' });
    });

    test('should return 400 when password reset fails', async () => {
        const mockResult = { success: false };
        (AuthService.PasswordReset as jest.Mock).mockResolvedValue(mockResult);
        
        await AuthController.PasswordReset(req as Request, res as Response);
        
        expect(AuthService.PasswordReset).toHaveBeenCalledWith({ userId: 1 });
        expect(httpStatus.BAD_REQUEST).toHaveBeenCalledWith(res, { message: 'Invalid request, please try again.' });
    });
});
