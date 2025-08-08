import 'jest';
import PermissionService from '../../src/service/permission';
import Permission from '../../src/models/permission';

jest.mock('../../src/models/permission');

describe('PermissionService', () => {
    test('should get all permissions', async () => {
        const mockResult = [{}];
        (Permission.findAll as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await PermissionService.GetPermission({});
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found when no permissions exist', async () => {
        (Permission.findAll as jest.Mock).mockResolvedValue([]);
        
        const result = await PermissionService.GetPermission({});
        expect(result).toEqual({ success: false, data: [], message: 'Permissions Not Found' });
    });

    test('should get permission by id', async () => {
        const mockResult = { id: 1 };
        (Permission.findOne as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await PermissionService.GetPermissionById(1);
        expect(result).toEqual({ success: true, data: mockResult });
    });

    test('should return not found for invalid id', async () => {
        (Permission.findOne as jest.Mock).mockResolvedValue(null);
        
        const result = await PermissionService.GetPermissionById(1);
        expect(result).toEqual({ success: false, data: null, message: 'Permission Not Found' });
    });

    test('should add a permission', async () => {
        const mockResult = { id: 1, action: 'test', baseUrl:'/api', method:'GET', path:'/' };
        (Permission.create as jest.Mock).mockResolvedValue(mockResult);
        
        const result = await PermissionService.AddPermission(mockResult);    
        expect(result).toEqual({ success: true, data: mockResult, message: 'Permission Added' });
    });

    test('should update permission by id', async () => {
        (Permission.update as jest.Mock).mockResolvedValue([1]);
        
        const result = await PermissionService.UpdatePermissionById(1, {});
        expect(result).toEqual({ success: true, message: 'Permission Updated' });
    });

    test('should return not updated for invalid id', async () => {
        (Permission.update as jest.Mock).mockResolvedValue([0]);
        
        const result = await PermissionService.UpdatePermissionById(1, {});
        expect(result).toEqual({ success: false, message: 'Permission Not Updated' });
    });

    test('should remove permission by id', async () => {
        (Permission.destroy as jest.Mock).mockResolvedValue(1);
        
        const result = await PermissionService.RemovePermissionById(1);
        expect(result).toEqual({ success: true, message: 'Permission Deleted' });
    });

    test('should return error while deleting permission', async () => {
        (Permission.destroy as jest.Mock).mockResolvedValue(0);
        
        const result = await PermissionService.RemovePermissionById(1);
        expect(result).toEqual({ success: false, message: 'Error while Deleting Permission' });
    });

    test('should restore permission by id', async () => {
        (Permission.restore as jest.Mock).mockResolvedValue(1);
        
        const result = await PermissionService.RestorePermissionById(1);
        expect(result).toEqual({ success: true, message: 'Restored' });
    });
});
