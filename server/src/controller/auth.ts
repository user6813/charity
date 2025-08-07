import {  Response } from "express";
import AuthService, { LoginInterface } from "../service/auth";
import httpStatus from "../utils/httpStatus";
import { UserAttributes } from "../models/user";
import { CustomRequest } from "../types/global";


// Login handler
const Login = async (req: CustomRequest, res: Response): Promise<any> => {
    const data: LoginInterface = req.body || {};
    const result = await AuthService.Login(data);
    if (result.success) {
        httpStatus.OK(res, result);
    } else {
        httpStatus.NOT_FOUND(res, result);
    }
};

// Signup handler
const Signup = async (req: CustomRequest, res: Response): Promise<any> => {
    const data: UserAttributes = req.body || {}; // You can add more validation here
    const result = await AuthService.Signup(data);
    if (result.success) {
        httpStatus.CREATED(res, result); // User created successfully
    } else {
        httpStatus.BAD_REQUEST(res, result); // Handle errors like invalid input
    }
};

// Logout handler
const Logout = async (req: CustomRequest, res: Response): Promise<any> => {
    const result = await AuthService.Logout({userId: 1});
    if (result.success) {
        httpStatus.OK(res, { message: "Successfully logged out." });
    } else {
        httpStatus.UNAUTHORIZED(res, { message: "Failed to log out, please try again." });
    }
};

// Get Logged-In User (me) handler
const Me = async (req: CustomRequest, res: Response): Promise<any> => {
    const result = await AuthService.Me({userId: 1});
    if (result.success) {
        httpStatus.OK(res, result); // Return the logged-in user data
    } else {
        httpStatus.UNAUTHORIZED(res, { message: "Not authenticated." });
    }
};

// Password Reset handler
const PasswordReset = async (req: CustomRequest, res: Response): Promise<any> => {
    const result = await AuthService.PasswordReset({userId: 1});
    if (result.success) {
        httpStatus.OK(res, { message: "Password reset link sent." });
    } else {
        httpStatus.BAD_REQUEST(res, { message: "Invalid request, please try again." });
    }
};

export default {
    Login,
    Signup,
    Logout,
    Me,
    PasswordReset
};
