import 'jest';
import UserService from '../../src/service/user';
import User from '../../src/models/user';

jest.mock('../../src/models/user', () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

jest.mock('../../src/models/contract', () => ({
    findAll: jest.fn(),
}));

jest.mock('../../src/models/kick', () => ({
    findAll: jest.fn(),
}));

jest.mock('../../src/models/kickPayment', () => ({
    findAll: jest.fn(),
}));

jest.mock('../../src/service/subscription', () => ({
    GetSubscriptionById: jest.fn(),
}));

describe('UserService', () => {
    test('should get all users', async () => {
        const mockResult = [{}];
        User.findAll = jest.fn().mockResolvedValue(mockResult);
        
        const result = await UserService.GetUser({});
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found when no users exist', async () => {
        User.findAll = jest.fn().mockResolvedValue([]);
        
        const result = await UserService.GetUser({});
        expect(result).toEqual({ success: false, data: [], message: 'Users Not Found' });
    });

    test('should get user by id', async () => {
        const mockResult = { id: 1 };
        User.findOne = jest.fn().mockResolvedValue(mockResult);
        
        const result = await UserService.GetUserById(1);
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found for invalid user id', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);
        
        const result = await UserService.GetUserById(1);
        expect(result).toEqual({ success: false, data: null, message: 'User Not Found' });
    });

    test('should update user by id', async () => {
        User.update = jest.fn().mockResolvedValue([1]);
        
        const result = await UserService.UpdateUserById(1, {});
        expect(result).toEqual({ success: true, message: 'User Updated' });
    });

    test('should return not updated for invalid user id', async () => {
        User.update = jest.fn().mockResolvedValue([0]);
        
        const result = await UserService.UpdateUserById(1, {});
        expect(result).toEqual({ success: false, message: 'User Not Updated' });
    });

    test('should remove user by id', async () => {
        User.destroy = jest.fn().mockResolvedValue(1);
        
        const result = await UserService.RemoveUserById(1);
        expect(result).toEqual({ success: true, message: 'User Deleted' });
    });

    test('should return error when user deletion fails', async () => {
        User.destroy = jest.fn().mockResolvedValue(0);
        
        const result = await UserService.RemoveUserById(1);
        expect(result).toEqual({ success: false, message: 'Error while Deleting User' });
    });
});
