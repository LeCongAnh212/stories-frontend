import axios from '@/api/axios'
import { LoginRequest, LoginResponse, FormRegister, RegisterResponse } from './types'

const headers = {
    'Content-Type': 'multipart/form-data',
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        return await axios.post('/login', data)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const register = async (data: FormRegister): Promise<RegisterResponse> => {
    try {
        return await axios.post('/register', data, { headers })
    } catch (error) {
        return Promise.reject(error)
    }
}
