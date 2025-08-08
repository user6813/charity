import { Request, Response, NextFunction } from "express"
import createError from 'http-errors'

export const errorWrapper = (fn: (...args: any[]) => any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            fn(req, res, next)
        }catch(ex){
            next(ex)
        }
    }
}

export const errorWrapperFun = (fn: any) => (...args:any[]) => fn(...args).catch(args[2])

interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    console.log(`\n<<======= ERROR ==============>>\n${JSON.stringify(err)}`)
    res.status(err.status ?? 500).json({ success: false, error: err, message: err.message || "Internal Server Error" });
};


export const errorRouteHandler = (req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Route Not Found"))
}