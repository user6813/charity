import {  Response } from "express"
import RoleService from "../service/role"
import httpStatus from "../utils/httpStatus"
import { RoleAttributes } from "../models/role"
import { CustomRequest } from "../types/global";


const Get = async (req: CustomRequest, res: Response): Promise<any> => {
    const result = await RoleService.GetRole(req.params)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const GetById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await RoleService.GetRoleById(+id)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const Add = async (req: CustomRequest, res: Response) => {
    const data: RoleAttributes = req.body
    const result = await RoleService.AddRole(data)
    if(result.success){
        httpStatus.CREATED(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const UpdateById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const data = req.body
    const result = await RoleService.UpdateRoleById(+id, data)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const RemoveById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await RoleService.RemoveRoleById(+id)
    if(result.success){
        httpStatus.NO_CONTENT(res)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const RestoreById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await RoleService.RestoreRoleById(+id)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
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