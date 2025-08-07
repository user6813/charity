import { AuthenticationCheck, AuthorizationCheck, GeneratePassword, ComparePassword } from "../../src/utils/auth";
import * as jwtUtils from "../../src/utils/jwt";
import httpStatus from "../../src/utils/httpStatus";
import bcryptjs from "bcryptjs";
import RolePermissionService from "../../src/service/rolePermission";
import { jest } from "@jest/globals";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../../src/types/global";

jest.mock("../../src/utils/httpStatus");
jest.mock("../../src/utils/jwt");
jest.mock("bcryptjs");
jest.mock("../../src/service/rolePermission");

describe("AuthenticationCheck", () => {
  let req: Request, res: Response, next: NextFunction;

  beforeEach(() => {
    req = { headers: { authorization: "Bearer token" } } as Request;
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
    next = jest.fn();
  });

  test("should return UNAUTHORIZED if no token is provided", () => {
    req.headers.authorization = undefined;
    AuthenticationCheck(req, res, next);
    expect(httpStatus.UNAUTHORIZED).toHaveBeenCalledWith(res, { success: false, message: "Authorization header missing" });
  });

  test("should return UNAUTHORIZED if token verification fails", () => {
    jest.mocked(jwtUtils.TokenVerify).mockReturnValue({ success: false });
    AuthenticationCheck(req, res, next);
    expect(httpStatus.UNAUTHORIZED).toHaveBeenCalled();
  });

  test("should call next if token verification succeeds", () => {
    jest.mocked(jwtUtils.TokenVerify).mockReturnValue({ success: true, data: { userId: 1 } });
    AuthenticationCheck(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe("GeneratePassword", () => {
  test("should generate a hashed password", () => {
    jest.mocked(bcryptjs.genSaltSync).mockReturnValue("salt");
    jest.mocked(bcryptjs.hashSync).mockReturnValue("hashedPassword");
    const password = "test123";
    const hashedPassword = GeneratePassword(password);
    expect(hashedPassword).toBe("hashedPassword");
  });
});

describe("ComparePassword", () => {
  test("should return true if passwords match", () => {
    jest.mocked(bcryptjs.compareSync).mockReturnValue(true);
    expect(ComparePassword("password", "password")).toBe(true);
  });

  test("should return false if passwords do not match", () => {
    jest.mocked(bcryptjs.compareSync).mockReturnValue(false);
    expect(ComparePassword("password", "wrongpassword")).toBe(false);
  });
});

describe("AuthorizationCheck", () => {
  let req: CustomRequest, res: Response, next: NextFunction;

  beforeEach(() => {
    req = { path: "/test", method: "GET", baseUrl: "/api", decoded: { roleId: 1 } } as CustomRequest;
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() } as unknown as Response;
    next = jest.fn();
  });

  test("should return FORBIDDEN if roleId is missing", async () => {
    req.decoded = {};
    await AuthorizationCheck(req, res, next);
    expect(httpStatus.FORBIDDEN).toHaveBeenCalledWith(res, { success: false, message: "Authorization header missing" });
  });

  test("should return FORBIDDEN if role permissions fetch fails", async () => {
    jest.mocked(RolePermissionService.GetRolePermisison).mockResolvedValue({ success: false });
    await AuthorizationCheck(req, res, next);
    expect(httpStatus.FORBIDDEN).toHaveBeenCalled();
  });

  test("should call next if permission exists", async () => {
    jest.mocked(RolePermissionService.GetRolePermisison).mockResolvedValue({
      success: true,
      data: { permissions: [{ path: "/test", baseUrl: "/api", method: "GET" }] },
    });
    await AuthorizationCheck(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
