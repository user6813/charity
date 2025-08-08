import 'jest';
import AuthService from '../../src/service/auth';
import User from '../../src/models/user';
import { ComparePassword, GeneratePassword } from '../../src/utils/auth';
import { GenerateToken } from '../../src/utils/jwt';

jest.mock('../../src/models/user');
jest.mock('../../src/utils/auth');
jest.mock('../../src/utils/jwt');

describe('AuthService', () => {
    test('should login successfully', async () => {
        const mockUser = { id: 1, password: 'hashedPass', subscriptionId: 2, roleId: 3 };
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (ComparePassword as jest.Mock).mockReturnValue(true);
        (GenerateToken as jest.Mock).mockReturnValue({ success: true, data: 'mockToken' });
        
        const result = await AuthService.Login({ email: 'test@example.com', password: 'password' });
        expect(result).toEqual({ success: true, data: { token: 'mockToken' }, message: 'User LoggedIn' });
    });

    test('should return error if email does not exist', async () => {
        (User.findOne as jest.Mock).mockResolvedValue(null);
        
        const result = await AuthService.Login({ email: 'test@example.com', password: 'password' });
        expect(result).toEqual({ success: false, message: 'Email Not Exist' });
    });

    test('should return error if password is incorrect', async () => {
        const mockUser = { id: 1, password: 'hashedPass' };
        (User.findOne as jest.Mock).mockResolvedValue(mockUser);
        (ComparePassword as jest.Mock).mockReturnValue(false);
        
        const result = await AuthService.Login({ email: 'test@example.com', password: 'wrongPass' });
        expect(result).toEqual({ success: false, message: 'Invalid Email and Password' });
    });

    test('should signup successfully', async () => {
        const mockUser = { id: 1, subscriptionId: 2, roleId: 3 };
        (GeneratePassword as jest.Mock).mockReturnValue('hashedPass');
        (User.create as jest.Mock).mockResolvedValue(mockUser);
        (GenerateToken as jest.Mock).mockReturnValue({ success: true, data: 'mockToken' });
        
        const result = await AuthService.Signup({ email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe', entityName: 'Test', entityDescription: 'Description' });
        expect(result).toEqual({ success: true, data: { token: 'mockToken' }, message: 'New User Created' });
    });

    test('should return error if signup fails', async () => {
        (GeneratePassword as jest.Mock).mockReturnValue('hashedPass');
        (User.create as jest.Mock).mockResolvedValue(null);
        
        const result = await AuthService.Signup({ email: 'test@example.com', password: 'password', firstName: 'John', lastName: 'Doe', entityName: 'Test', entityDescription: 'Description' });
        expect(result).toEqual({ success: false, data: null, message: 'Error while Creating User' });
    });

    test('should logout successfully', async () => {
        const result = await AuthService.Logout({ userId: 1 });
        expect(result).toEqual({ success: true });
    });

    test('should return authenticated user', async () => {
        const result = await AuthService.Me({ userId: 1 });
        expect(result).toEqual({ success: true });
    });

    test('should reset password', async () => {
        const result = await AuthService.PasswordReset({ userId: 1 });
        expect(result).toEqual({ success: true });
    });
});
