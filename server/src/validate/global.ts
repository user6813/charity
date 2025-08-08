import { Request, Response, NextFunction } from "express";
import httpStatus from "../utils/httpStatus";

type ParamsType = 'integer' | 'string'

export const ValidParamsId = (params: string, t: ParamsType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const paramValue = req.params?.[params];

    if (t === 'integer') {
      if (!isNaN(+paramValue) && Number.isInteger(Number(paramValue))) {
        return next();
      }
    } else if (t === 'string') {
      if (typeof paramValue === 'string' && isNaN(Number(paramValue))) {
        return next();
      }
    }
    
    return httpStatus.BAD_REQUEST(res, {
      success: false,
      message: `Invalid Params Type, \nParams ${params} should be of type ${t}`,
    });
  };
};

