import 'jest';
import { Request, Response } from 'express';
import RolePermissionController from '../../src/controller/rolePermission';
import RolePermissionService from '../../src/service/rolePermission';
import httpStatus from '../../src/utils/httpStatus';

jest.mock('../../src/service/rolePermission');
jest.mock('../../src/utils/httpStatus');

describe('RolePermissionController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { params: { roleId: '1' }, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    test('should get role permissions', async () => {
        const mockResult = { success: true, data: [{ id: 1, permissions: [{ id: 2 }] }] };
        (RolePermissionService.GetRolePermisison as jest.Mock).mockResolvedValue(mockResult);
        
        await RolePermissionController.Get(req as Request, res as Response);
        
        expect(RolePermissionService.GetRolePermisison).toHaveBeenCalledWith(1);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 when role permissions are not found', async () => {
        const mockResult = { success: false, data: null, message: 'Role Not Found' };
        (RolePermissionService.GetRolePermisison as jest.Mock).mockResolvedValue(mockResult);
        
        await RolePermissionController.Get(req as Request, res as Response);
        
        expect(RolePermissionService.GetRolePermisison).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should update role permissions', async () => {
        const mockResult = { success: true, message: 'Role Permissions Updated' };
        (RolePermissionService.UpdateRolePermission as jest.Mock).mockResolvedValue(mockResult);
        
        await RolePermissionController.UpdateById(req as Request, res as Response);
        
        expect(RolePermissionService.UpdateRolePermission).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 when role update fails', async () => {
        const mockResult = { success: false, data: null, message: 'Role Not Found' };
        (RolePermissionService.UpdateRolePermission as jest.Mock).mockResolvedValue(mockResult);
        
        await RolePermissionController.UpdateById(req as Request, res as Response);
        
        expect(RolePermissionService.UpdateRolePermission).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });
});
