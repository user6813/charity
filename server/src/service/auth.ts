import User, { UserAttributes } from "../models/user";
import { GlobalResponse, TokenInterface } from "../types/global";
import { ComparePassword, GeneratePassword } from "../utils/auth";
import { GenerateToken } from "../utils/jwt";

export interface LoginInterface {
    email: string
    password: string
}

export interface SignupInterface extends LoginInterface {
    firstName: string
    lastName: string
    startUpName: string
    startUpDescription: string
}

export interface PasswordResetInterface {
    email: string
}


const Login = async (data:LoginInterface):Promise<GlobalResponse>  => {
    const { password, email } = data;
    const result = await User.findOne({
        where: {
            email
        }
    })
    if(!result){
       return { success: false, message: 'Email Not Exist' }
    }
    const validPass = ComparePassword(password, result.password) 
    if(!validPass){
        return { success: false, message: 'Invalid Email and Password' } 
    }
    const token = GenerateToken({ userId: result.id, subscriptionId: result.subscriptionId, roleId: result.roleId })
    if(!token.success) return token
    return { success: true, data: { token: token.data }, message: 'User LoggedIn' }
}

const Signup = async (data:UserAttributes):Promise<GlobalResponse>  => {
    const { password } = data;
    const hashPassword = GeneratePassword(password)
    const result = await User.create({
        ...data,
        password: hashPassword
    })
    if(result){
        const token = GenerateToken({ userId: result.id, subscriptionId: result.subscriptionId, roleId: result.roleId })
        if(!token.success) return token
        return { success: true, data: { token: token.data }, message: 'New User Created' }
    }else{
        return { success: false, data: result, message: "Error while Creating User" }
    }
    
}

const Logout = async (data:TokenInterface):Promise<GlobalResponse>  => {

    return { success: true }
}

const Me = async (data:TokenInterface):Promise<GlobalResponse>  => {


    return { success: true }
}

const PasswordReset = async (data:TokenInterface):Promise<GlobalResponse>  => {

    return { success: true }
}




export default {
    Login,
    Signup,
    Logout,
    Me,
    PasswordReset
}