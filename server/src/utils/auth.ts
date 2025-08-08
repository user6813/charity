import { CustomRequest, GlobalResponse } from "../types/global";
import { Response, NextFunction } from "express";
import httpStatus from "./httpStatus";
import { TokenVerify } from "../utils/jwt"
import bcryptjs from 'bcryptjs'
import { PermissionAttributes } from "../models/permission";
import RolePermissionService from "../service/rolePermission"


export const AuthenticationCheck = (req: CustomRequest, res: Response, next: NextFunction): any => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || '';
    if (!token) {
      return httpStatus.UNAUTHORIZED(res, {
        success: false,
        message: "Authorization header missing"
      });
    }
    const result = TokenVerify(token);
    if (!result.success) {
      return httpStatus.UNAUTHORIZED(res, result);
    }
    req.decoded = result.data;
    return next();
  } catch (ex) {
    return httpStatus.NOT_FOUND(res, { success: false, message: "Error while checking Authentication" });
  }
};

export const GeneratePassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync(10);
  const hash = bcryptjs.hashSync(password, salt)
  return hash
}

export const ComparePassword = (password: string, hashPassword: string) => {
  const valid = bcryptjs.compareSync(password, hashPassword)
  return valid
}

const pathMatcher = (path: string, url: string): boolean => {
  if (path == url) {
    return true
  }
  if(path.replace('/','') && url.replace('/','')) {
    return true
  }
  return false
}

export const AuthorizationCheck = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
  try {
    const currentPath = req.path;
    const currentMethod = req.method;
    const currentBaseUrl = req.baseUrl;

    const { roleId } = req.decoded || {};
    if (!roleId) {
      return httpStatus.FORBIDDEN(res, { success: false, message: "Authorization header missing" });
    }

    const result = await RolePermissionService.GetRolePermisison(roleId);
    if (!result.success) { 
      return httpStatus.FORBIDDEN(res, result); // Ensure return
    }

    const availablePermissionAry: { path: string, baseUrl: string, method: string }[] = result?.data?.permissions?.map((permission: PermissionAttributes) => ({
      path: permission.path,
      baseUrl: permission.baseUrl,
      method: permission.method,
    }));

    const permissionExist = availablePermissionAry.some((data) => 
      data.baseUrl === currentBaseUrl && data.method === currentMethod && pathMatcher(data.path, currentPath)
    );

    if (!permissionExist) {
      return httpStatus.FORBIDDEN(res, { success: false, message: "Unauthorized User" });
    }

    return next();

  } catch (ex) {
    return httpStatus.NOT_FOUND(res, { success: false, message: "Error while checking Authorization" });
  }
};

