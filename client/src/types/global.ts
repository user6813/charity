export interface GlobalResponse<T = any> {
    success: boolean
    data?: T
    message?: string
    error?: string | Error
}