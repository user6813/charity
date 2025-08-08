import 'jest';
import RoleService from '../../src/service/role';
import Role from '../../src/models/role';

jest.mock('../../src/models/role');

describe('RoleService', () => {
    test('should get all roles', async () => {
        const mockResult = [{}];
        (Role.findAll as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await RoleService.GetRole({});
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found when no roles exist', async () => {
        (Role.findAll as jest.Mock).mockResolvedValue([]);
        
        const result = await RoleService.GetRole({});
        expect(result).toEqual({ success: false, data: [], message: 'Roles Not Found' });
    });

    test('should get role by id', async () => {
        const mockResult = { id: 1 };
        (Role.findOne as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await RoleService.GetRoleById(1);
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found for invalid id', async () => {
        (Role.findOne as jest.Mock).mockResolvedValue(null);
        
        const result = await RoleService.GetRoleById(1);
        expect(result).toEqual({ success: false, data: null, message: 'Role Not Found' });
    });

    test('should add a role', async () => {
        const mockResult = { id: 1 };
        (Role.create as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await RoleService.AddRole({roleDescription:'test', roleName:'admin'});
        expect(result).toEqual({ success: true, data: mockResult, message: 'Role Added' });
    });

    test('should update role by id', async () => {
        (Role.update as jest.Mock).mockResolvedValue([1]);
        
        const result = await RoleService.UpdateRoleById(1, {});
        expect(result).toEqual({ success: true, message: 'Role Updated' });
    });

    test('should return not updated for invalid id', async () => {
        (Role.update as jest.Mock).mockResolvedValue([0]);
        
        const result = await RoleService.UpdateRoleById(1, {});
        expect(result).toEqual({ success: false, message: 'Role Not Updated' });
    });

    test('should remove role by id', async () => {
        (Role.destroy as jest.Mock).mockResolvedValue(1);
        
        const result = await RoleService.RemoveRoleById(1);
        expect(result).toEqual({ success: true, message: 'Role Deleted' });
    });

    test('should return error while deleting role', async () => {
        (Role.destroy as jest.Mock).mockResolvedValue(0);
        
        const result = await RoleService.RemoveRoleById(1);
        expect(result).toEqual({ success: false, message: 'Error while Deleting Role' });
    });

    test('should restore role by id', async () => {
        (Role.restore as jest.Mock).mockResolvedValue(1);
        
        const result = await RoleService.RestoreRoleById(1);
        expect(result).toEqual({ success: true, message: 'Restored' });
    });
});
