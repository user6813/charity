import { Request } from "express";

export interface GlobalResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    error?: string | Error
}

export interface TokenInterface {
    userId?: number;
    subscriptionId?: number;
    roleId?: number;
}

export interface CustomRequest extends Request{
    decoded?: TokenInterface
}

export interface QueryInterface {
    offset: number
    limit: number
    attributes: string[]
}

export interface OptionsInterface {
    page?: number
    limit?: number
    fields?: string
}