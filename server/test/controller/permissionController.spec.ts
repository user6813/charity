import 'jest';
import { Request, Response } from 'express';
import PermissionController from '../../src/controller/permission';
import PermissionService from '../../src/service/permission';
import httpStatus from '../../src/utils/httpStatus';

jest.mock('../../src/service/permission');
jest.mock('../../src/utils/httpStatus');

describe('PermissionController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { params: { id: '1' }, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    test('should get all permissions', async () => {
        const mockResult = { success: true, data: [{}] };
        (PermissionService.GetPermission as jest.Mock).mockResolvedValue(mockResult);
        
        await PermissionController.Get(req as Request, res as Response);
        
        expect(PermissionService.GetPermission).toHaveBeenCalled();
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should get permission by id', async () => {
        const mockResult = { success: true, data: {} };
        (PermissionService.GetPermissionById as jest.Mock).mockResolvedValue(mockResult);
        
        await PermissionController.GetById(req as Request, res as Response);
        
        expect(PermissionService.GetPermissionById).toHaveBeenCalledWith(1);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should add a permission', async () => {
        const mockResult = { success: true, data: {} };
        (PermissionService.AddPermission as jest.Mock).mockResolvedValue(mockResult);
        
        await PermissionController.Add(req as Request, res as Response);
        
        expect(PermissionService.AddPermission).toHaveBeenCalledWith(req.body);
        expect(httpStatus.CREATED).toHaveBeenCalledWith(res, mockResult);
    });

    test('should update permission by id', async () => {
        const mockResult = { success: true, message: 'Permission Updated' };
        (PermissionService.UpdatePermissionById as jest.Mock).mockResolvedValue(mockResult);
        
        await PermissionController.UpdateById(req as Request, res as Response);
        
        expect(PermissionService.UpdatePermissionById).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should remove permission by id', async () => {
        const mockResult = { success: true, message: 'Permission Deleted' };
        (PermissionService.RemovePermissionById as jest.Mock).mockResolvedValue(mockResult);
        
        await PermissionController.RemoveById(req as Request, res as Response);
        
        expect(PermissionService.RemovePermissionById).toHaveBeenCalledWith(1);
        expect(httpStatus.NO_CONTENT).toHaveBeenCalledWith(res);
    });

    test('should restore permission by id', async () => {
        const mockResult = { success: true, message: 'Restored' };
        (PermissionService.RestorePermissionById as jest.Mock).mockResolvedValue(mockResult);
        
        await PermissionController.RestoreById(req as Request, res as Response);
        
        expect(PermissionService.RestorePermissionById).toHaveBeenCalledWith(1);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if no permissions found', async () => {
        const mockResult = { success: false, message: 'No permissions found' };
        jest.spyOn(PermissionService, 'GetPermission').mockResolvedValue(mockResult);

        await PermissionController.Get(req as Request, res as Response);

        expect(PermissionService.GetPermission).toHaveBeenCalled();
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if permission by ID is not found', async () => {
        const mockResult = { success: false, message: 'Permission not found' };
        jest.spyOn(PermissionService, 'GetPermissionById').mockResolvedValue(mockResult);

        await PermissionController.GetById(req as Request, res as Response);

        expect(PermissionService.GetPermissionById).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if permission is not added', async () => {
        const mockResult = { success: false, message: 'Failed to add permission' };
        jest.spyOn(PermissionService, 'AddPermission').mockResolvedValue(mockResult);

        await PermissionController.Add(req as Request, res as Response);

        expect(PermissionService.AddPermission).toHaveBeenCalledWith(req.body);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if permission update fails', async () => {
        const mockResult = { success: false, message: 'Failed to update permission' };
        jest.spyOn(PermissionService, 'UpdatePermissionById').mockResolvedValue(mockResult);

        await PermissionController.UpdateById(req as Request, res as Response);

        expect(PermissionService.UpdatePermissionById).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if permission removal fails', async () => {
        const mockResult = { success: false, message: 'Failed to delete permission' };
        jest.spyOn(PermissionService, 'RemovePermissionById').mockResolvedValue(mockResult);

        await PermissionController.RemoveById(req as Request, res as Response);

        expect(PermissionService.RemovePermissionById).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if permission restoration fails', async () => {
        const mockResult = { success: false, message: 'Failed to restore permission' };
        jest.spyOn(PermissionService, 'RestorePermissionById').mockResolvedValue(mockResult);

        await PermissionController.RestoreById(req as Request, res as Response);

        expect(PermissionService.RestorePermissionById).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });
});
