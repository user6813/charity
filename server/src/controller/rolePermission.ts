import {  Response } from "express"
import RolePermissionService from "../service/rolePermission"
import httpStatus from "../utils/httpStatus"
import { CustomRequest } from "../types/global";


const Get = async (req: CustomRequest, res: Response): Promise<any> => {
    const { roleId } = req.params
    const result = await RolePermissionService.GetRolePermisison(+roleId)
    if (result.success) {
        httpStatus.OK(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

const UpdateById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { roleId } = req.params
    const data = req.body
    const result = await RolePermissionService.UpdateRolePermission(+roleId, data)
    if (result.success) {
        httpStatus.OK(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

export default {
    Get,
    UpdateById,
}