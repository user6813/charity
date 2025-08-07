import { Request, Response, NextFunction } from "express";
import { ValidateInput } from "../utils/validate";
import { UserDto } from "../dto/user";
import httpStatus from "../utils/httpStatus";

export const CreateUserValidate = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body
    const result = await ValidateInput(UserDto, data)
    if(!result.success){
        httpStatus.BAD_REQUEST(res, result)
    }else{
        req.body = result.data
        next()
    }
}

