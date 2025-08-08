import {  Response } from "express"
import UserService from "../service/user"
import httpStatus from "../utils/httpStatus"
import { CustomRequest } from "../types/global";


const Get = async (req: CustomRequest, res: Response): Promise<any> => {
    const result = await UserService.GetUser(req.params)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const GetById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await UserService.GetUserById(+id)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const UpdateById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const data = req.body
    const result = await UserService.UpdateUserById(+id, data)
    if(result.success){
        httpStatus.OK(res, result)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

const RemoveById = async (req: CustomRequest, res: Response): Promise<any> => {
    const { id } = req.params
    const result = await UserService.RemoveUserById(+id)
    if(result.success){
        httpStatus.NO_CONTENT(res)
    }else{
        httpStatus.NOT_FOUND(res, result)
    }
}

export default {
    Get,
    GetById,
    UpdateById,
    RemoveById,
}