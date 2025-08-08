import 'jest';
import RolePermissionService from '../../src/service/rolePermission';
import Role from '../../src/models/role';
import Permission from '../../src/models/permission';
import RolePermission from '../../src/models/rolePermission';
import { Op } from 'sequelize';

jest.mock('../../src/models/role', () => {
    return {
        findOne: jest.fn(),
        belongsToMany: jest.fn(),
    };
});

jest.mock('../../src/models/permission', () => {
    return {
        belongsToMany: jest.fn(),
    };
});

jest.mock('../../src/models/rolePermission', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
}));

describe('RolePermissionService', () => {

    // beforeEach(() => {
    //     jest.restoreAllMocks(); // Reset mocks before each test
    //     jest.mock('../../src/models/role', () => {
    //         return {
    //             findOne: jest.fn(),
    //             belongsToMany: jest.fn(),
    //         };
    //     });
        
    //     jest.mock('../../src/models/permission', () => {
    //         return {
    //             belongsToMany: jest.fn(),
    //         };
    //     });
        
    //     jest.mock('../../src/models/rolePermission', () => ({
    //         create: jest.fn(),
    //         findOne: jest.fn(),
    //         destroy: jest.fn(),
    //     }));
        
    //   });

    // test('should get all role permissions', async () => {
    //     const mockResult = [{}];
    //     (RolePermission.findAll as jest.Mock).mockResolvedValue(mockResult);

    //     const result = await RolePermissionService.GetRolePermisison(1);
    //     expect(result).toEqual({ success: true, data: mockResult });
    // });

    // test('should return not found when no role permissions exist', async () => {
    //     (RolePermission.findAll as jest.Mock).mockResolvedValue([]);
        
    //     const result = await RolePermissionService.GetRolePermisison(10);
    //     expect(result).toEqual({ success: false, message: 'Role Permissions Updated' });
    // });


    test('should get role permissions', async () => {
        const mockResult = { id: 1, permissions: [{ id: 2 }] };
        (Role.findOne as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await RolePermissionService.GetRolePermisison(1);
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found for invalid role id', async () => {
        (Role.findOne as jest.Mock).mockResolvedValue(null);
        
        const result = await RolePermissionService.GetRolePermisison(1);
        expect(result).toEqual({ success: false, data: null, message: 'Role Not Found' });
    });

    test('should update role permissions', async () => {
        const mockRole = { id: 1, permissions: [{ id: 2 }] };
        (Role.findOne as jest.Mock).mockResolvedValue(mockRole);
        (RolePermission.findOne as jest.Mock).mockResolvedValue(null);
        (RolePermission.create as jest.Mock).mockResolvedValue(mockRole);
        (RolePermission.destroy as jest.Mock).mockResolvedValue(1);
        
        const result = await RolePermissionService.UpdateRolePermission(1, [3]);
        expect(result).toEqual({ success: true, message: 'Role Permissions Updated' });
    });

    test('should not update role permissions if role not found', async () => {
        (Role.findOne as jest.Mock).mockResolvedValue(null);
        
        const result = await RolePermissionService.UpdateRolePermission(1, [2]);
        expect(result).toEqual({ success: false, data: null, message: 'Role Not Found' });
    });

    test('should restore deleted role permission instead of creating new', async () => {
        const mockRole = { id: 1, permissions: [{ id: 2 }] };
        const mockDeletedPermission = { restore: jest.fn() };
        (Role.findOne as jest.Mock).mockResolvedValue(mockRole);
        (RolePermission.findOne as jest.Mock).mockResolvedValue(mockDeletedPermission);
        
        await RolePermissionService.UpdateRolePermission(1, [2, 3]);
        expect(mockDeletedPermission.restore).toHaveBeenCalled();
    });
});
