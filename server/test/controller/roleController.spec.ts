import 'jest';
import { Request, Response } from 'express';
import RoleController from '../../src/controller/role';
import RoleService from '../../src/service/role';
import httpStatus from '../../src/utils/httpStatus';

jest.mock('../../src/service/role');
jest.mock('../../src/utils/httpStatus');

describe('RoleController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = { params: { id: '1' }, body: {} };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    test('should get all roles', async () => {
        const mockResult = { success: true, data: [{}] };
        (RoleService.GetRole as jest.Mock).mockResolvedValue(mockResult);
        
        await RoleController.Get(req as Request, res as Response);
        
        expect(RoleService.GetRole).toHaveBeenCalled();
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should get role by id', async () => {
        const mockResult = { success: true, data: {} };
        (RoleService.GetRoleById as jest.Mock).mockResolvedValue(mockResult);
        
        await RoleController.GetById(req as Request, res as Response);
        
        expect(RoleService.GetRoleById).toHaveBeenCalledWith(1);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should add a role', async () => {
        const mockResult = { success: true, data: {} };
        (RoleService.AddRole as jest.Mock).mockResolvedValue(mockResult);
        
        await RoleController.Add(req as Request, res as Response);
        
        expect(RoleService.AddRole).toHaveBeenCalledWith(req.body);
        expect(httpStatus.CREATED).toHaveBeenCalledWith(res, mockResult);
    });

    test('should update role by id', async () => {
        const mockResult = { success: true, message: 'Role Updated' };
        (RoleService.UpdateRoleById as jest.Mock).mockResolvedValue(mockResult);
        
        await RoleController.UpdateById(req as Request, res as Response);
        
        expect(RoleService.UpdateRoleById).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should remove role by id', async () => {
        const mockResult = { success: true, message: 'Role Deleted' };
        (RoleService.RemoveRoleById as jest.Mock).mockResolvedValue(mockResult);
        
        await RoleController.RemoveById(req as Request, res as Response);
        
        expect(RoleService.RemoveRoleById).toHaveBeenCalledWith(1);
        expect(httpStatus.NO_CONTENT).toHaveBeenCalledWith(res);
    });

    test('should restore role by id', async () => {
        const mockResult = { success: true, message: 'Restored' };
        (RoleService.RestoreRoleById as jest.Mock).mockResolvedValue(mockResult);
        
        await RoleController.RestoreById(req as Request, res as Response);
        
        expect(RoleService.RestoreRoleById).toHaveBeenCalledWith(1);
        expect(httpStatus.OK).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if no roles found', async () => {
        const mockResult = { success: false, message: 'No roles found' };
        jest.spyOn(RoleService, 'GetRole').mockResolvedValue(mockResult);

        await RoleController.Get(req as Request, res as Response);

        expect(RoleService.GetRole).toHaveBeenCalled();
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if role by ID is not found', async () => {
        const mockResult = { success: false, message: 'Role not found' };
        jest.spyOn(RoleService, 'GetRoleById').mockResolvedValue(mockResult);

        await RoleController.GetById(req as Request, res as Response);

        expect(RoleService.GetRoleById).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if role is not added', async () => {
        const mockResult = { success: false, message: 'Failed to add role' };
        jest.spyOn(RoleService, 'AddRole').mockResolvedValue(mockResult);

        await RoleController.Add(req as Request, res as Response);

        expect(RoleService.AddRole).toHaveBeenCalledWith(req.body);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if role update fails', async () => {
        const mockResult = { success: false, message: 'Failed to update role' };
        jest.spyOn(RoleService, 'UpdateRoleById').mockResolvedValue(mockResult);

        await RoleController.UpdateById(req as Request, res as Response);

        expect(RoleService.UpdateRoleById).toHaveBeenCalledWith(1, req.body);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if role removal fails', async () => {
        const mockResult = { success: false, message: 'Failed to delete role' };
        jest.spyOn(RoleService, 'RemoveRoleById').mockResolvedValue(mockResult);

        await RoleController.RemoveById(req as Request, res as Response);

        expect(RoleService.RemoveRoleById).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });

    test('should return 404 if role restoration fails', async () => {
        const mockResult = { success: false, message: 'Failed to restore role' };
        jest.spyOn(RoleService, 'RestoreRoleById').mockResolvedValue(mockResult);

        await RoleController.RestoreById(req as Request, res as Response);

        expect(RoleService.RestoreRoleById).toHaveBeenCalledWith(1);
        expect(httpStatus.NOT_FOUND).toHaveBeenCalledWith(res, mockResult);
    });
});
