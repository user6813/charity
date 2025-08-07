
import { Request, Response, NextFunction } from "express";
import { ValidateInput } from "../utils/validate";
import { RoleDto, UpdateRoleDto } from "../dto/role";
import httpStatus from "../utils/httpStatus";

export const CreateRoleValidate = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const result = await ValidateInput(RoleDto, data)
    if(!result.success){
        httpStatus.BAD_REQUEST(res, result)
    }else{
        req.body = result.data
        next()
    }
}

export const UpdateRoleValidate = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const result = await ValidateInput(UpdateRoleDto, data)
    if(!result.success){
        httpStatus.BAD_REQUEST(res, result)
    }else{
        req.body = result.data
        next()
    }
}