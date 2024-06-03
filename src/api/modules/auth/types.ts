export interface LoginRequest {
    email: string | undefined
    password: string | undefined
    role: number
}

export interface LoginResponse {
    code: number
    message: string
    access_token: string
    data: any
}

export interface UserDetail{
    status: number
}