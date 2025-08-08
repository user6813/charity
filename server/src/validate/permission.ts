
import { Request, Response, NextFunction } from "express";
import { ValidateInput } from "../utils/validate";
import { PermissionDto, UpdatePermissionDto } from "../dto/permission";
import httpStatus from "../utils/httpStatus";

export const CreatePermissionValidate = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const result = await ValidateInput(PermissionDto, data)
    if(!result.success){
        httpStatus.BAD_REQUEST(res, result)
    }else{
        req.body = result.data
        next()
    }
}

export const UpdatePermissionValidate = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const result = await ValidateInput(UpdatePermissionDto, data)
    if(!result.success){
        httpStatus.BAD_REQUEST(res, result)
    }else{
        req.body = result.data
        next()
    }
}