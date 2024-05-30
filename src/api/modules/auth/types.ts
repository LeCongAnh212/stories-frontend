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

export interface FormRegister {
    username: string
    email: string
    password: string
    full_name: string
    avatar?: File | null
}

export interface RegisterResponse {
    code: number
    message: string
}
