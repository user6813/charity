import {  Response } from "express"
import PermissionService from "../service/permission"
import httpStatus from "../utils/httpStatus"
import { PermissionAttributes } from "../models/permission"
import { CustomRequest } from "../types/global";

const Get = async (req: CustomRequest, res: Response): Promise<any> => {
    const result = await PermissionService.GetPermission(req.params)
    if (result.success) {
        httpStatus.OK(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

const GetById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await PermissionService.GetPermissionById(+id)
    if (result.success) {
        httpStatus.OK(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

const Add = async (req: CustomRequest, res: Response) => {
    const data: PermissionAttributes = req.body
    const result = await PermissionService.AddPermission(data)
    if (result.success) {
        httpStatus.CREATED(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

const UpdateById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const data = req.body
    const result = await PermissionService.UpdatePermissionById(+id, data)
    if (result.success) {
        httpStatus.OK(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

const RemoveById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await PermissionService.RemovePermissionById(+id)
    if (result.success) {
        httpStatus.NO_CONTENT(res)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}

const RestoreById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await PermissionService.RestorePermissionById(+id)
    if (result.success) {
        httpStatus.OK(res, result)
    } else {
        httpStatus.NOT_FOUND(res, result)
    }
}


export default {
    Get,
    GetById,
    Add,
    UpdateById,
    RemoveById,
    RestoreById,
}