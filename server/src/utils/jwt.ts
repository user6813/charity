import jwt from "jsonwebtoken";
import { GlobalResponse, TokenInterface } from "../types/global";

const SECRET_KEY = 'qertyuiop'
const ACCESS_SECRET_KEY = 'asdfghjkl'

export const GenerateToken = (payload: TokenInterface, accessToken: boolean = false): GlobalResponse => {
    try{
        const token = jwt.sign(payload, accessToken ? ACCESS_SECRET_KEY : SECRET_KEY)
        return { success: true, data: token }
    }catch(ex: any){
        return { success: false, error: ex, message: 'Error while Generating Token' }
    }
}

export const TokenVerify = (token: string, accessToken: boolean = false): GlobalResponse => {
    try{
        const data = jwt.decode(token)
        return { success: true, data } 
    }catch(ex: any){
        return { success: false, error: ex, message: 'Error while Verifing Token' }
    }
}
